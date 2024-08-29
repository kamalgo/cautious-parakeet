import io
import json
import re
import requests
from google.cloud import vision
from google.cloud import translate_v2 as translate
from PIL import Image, ImageFilter, ImageOps, ImageEnhance
import os

# Initialize the Vision API client and Translation client
client_vision = vision.ImageAnnotatorClient()
translate_client = translate.Client()

def read_image_from_url(image_url):
    response = requests.get(image_url)
    response.raise_for_status()  # Raise an exception for HTTP errors
    return response.content

def get_text_from_image(image_content):
    image = vision.Image(content=image_content)
    try:
        response = client_vision.text_detection(image=image)
        texts = response.text_annotations
        if texts:
            description = texts[0].description
            return [line.strip() for line in description.split('\n') if line.strip()]
    except Exception as e:
        print(f"Google Cloud Vision API failed with error: {e}")
    return []

def translate_text(text, target_language='en'):
    if text and not is_english(text):
        translation = translate_client.translate(text, target_language=target_language)
        return translation['translatedText']
    return text

def is_english(text):
    try:
        text.encode(encoding='utf-8').decode('ascii')
    except UnicodeDecodeError:
        return False
    else:
        return True

def pre_process_image(image_content):
    image = Image.open(io.BytesIO(image_content))  # Use BytesIO to handle image bytes
    # Convert to grayscale
    gray = ImageOps.grayscale(image)
    # Enhance contrast
    enhancer = ImageEnhance.Contrast(gray)
    enhanced = enhancer.enhance(2)
    # Apply adaptive thresholding
    blurred = enhanced.filter(ImageFilter.GaussianBlur(2))
    threshold = blurred.point(lambda p: p > 128 and 255)
    return threshold

def extract_caste_certificate_info(lines, barcode):
    info = {
        "valid_from": None,
        "valid_till": None,
        "name_of_candidate": None,
        "certified_by": None,
        "issued_authority": None,
        "barcode": barcode,
        "caste": None,
        "district": None
    }
    for line in lines:
        if "belongs to" in line:
            match = re.search(r'belongs to\s*(.*\s*Caste)', line, re.IGNORECASE)
            if match:
                info["caste"] = match.group(1)
        if "certify that" in line:
            match = re.search(r'certify that\s*(.*)\s*Son of|certify that\s*(.*)\s*Daughter of', line, re.IGNORECASE)
            if match:
                info["name_of_candidate"] = match.group(1) if match.group(1) else match.group(2)
        if "Signed by" in line:
            match = re.search(r'Signed by\s*(.*)', line, re.IGNORECASE)
            if match:
                info["certified_by"] = match.group(1)
        if "Tehsildar" in line or "Tahsildar" in line or "Sub Divisional Officer" in line:
            info["issued_authority"] = "Tehsildar" if "Tehsildar" in line or "Tahsildar" in line else "Sub Divisional Officer"
        if "district" in line.lower():
            match = re.search(r'district\s*(\w+)', line, re.IGNORECASE)
            if match:
                info["district"] = match.group(1).strip()
    return info

def extract_info_from_text(lines, certificate_type, barcode):
    if certificate_type == 'caste':
        return extract_caste_certificate_info(lines, barcode)
    else:
        raise ValueError(f"Unknown certificate type: {certificate_type}")

def process_image(image_url, certificate_type):
    image_content = read_image_from_url(image_url)
    pre_processed_image = pre_process_image(image_content)
    extracted_text = get_text_from_image(image_content)
    barcode = get_barcode_from_image(image_content)  # Extract barcode
    extracted_info = extract_info_from_text(extracted_text, certificate_type, barcode)
    translated_info = {key: translate_text(value) for key, value in extracted_info.items() if value}
    output_file = f"extracted_{certificate_type}_info_{os.path.basename(image_url)}.json"
    with open(output_file, 'w', encoding='utf-8') as json_file:
        json.dump(translated_info, json_file, ensure_ascii=False, indent=4)
    return translated_info

def get_barcode_from_image(image_content):
    image = vision.Image(content=image_content)
    try:
        response = client_vision.text_detection(image=image)
        texts = response.text_annotations
        if texts:
            description = texts[0].description
            # Look for numeric sequences between 18 to 22 digits typically found in barcodes
            barcode_matches = re.findall(r'\b\d{18,22}\b', description)
            if barcode_matches:
                return max(barcode_matches, key=len)  # Return the longest match
    except Exception as e:
        print(f"Google Cloud Vision API failed with error: {e}")
    return None

if __name__ == "__main__":
    # Example usage
    image_url = "https://forstubucket1.s3.ap-south-1.amazonaws.com/documents/YBhjoRS0VRcK4uK7Nisq5DWVCQQJ4fwaLlTRsfb0.jpeg"
    certificate_type = "caste"
    extracted_info = process_image(image_url, certificate_type)
    print(json.dumps(extracted_info, indent=4))

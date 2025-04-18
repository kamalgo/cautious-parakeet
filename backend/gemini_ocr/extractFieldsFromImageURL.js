const axios = require("axios");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("YOUR_GEMINI_API_KEY");

async function urlToGenerativePart(imageUrl, mimeType = "image/jpeg") {
  const response = await axios.get(imageUrl, {
    responseType: "arraybuffer",
  });

  const base64Image = Buffer.from(response.data, "binary").toString("base64");

  return {
    inlineData: {
      data: base64Image,
      mimeType,
    },
  };
}

async function extractFieldsFromImageURL(imageUrl) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const imagePart = await urlToGenerativePart(imageUrl);

  const prompt = `From this image extract the following fields in JSON format:
  {
    "Name": "",
    "Gender": "",
    "DateOfBirth": "",
    "Category": "",
    "InstituteName": "",
    "CourseName": "",
    "DateOfAdmission": "",
    "Merit No": "",
    "Seat Type": "",
    "AdmissionLevel": ""
  }

If any field is missing, leave it blank.`;

  const result = await model.generateContent([prompt, imagePart]);
  const response = await result.response;
  const text = response.text();

  try {
    return JSON.parse(text);
  } catch (e) {
    console.error("Failed to parse Gemini response:", text);
    return {};
  }
}

module.exports = { extractFieldsFromImageURL };

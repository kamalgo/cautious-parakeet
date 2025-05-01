const axios = require("axios");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { normalizeAuthority } = require("../../backend/utils/normalizers/authorityNormalizer"); // adjust path if needed


const genAI = new GoogleGenerativeAI("AIzaSyD0ANJ4hfTwNnxwh-mUUQ70yPSfZfC_9hc");

async function urlToGenerativePart(imageUrl, mimeType = "image/jpeg") {
  const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
  const base64Image = Buffer.from(response.data, "binary").toString("base64");

  return {
    inlineData: {
      data: base64Image,
      mimeType,
    },
  };
}

function cleanGeminiJSON(text) {
  if (!text) {
    return "";
  }
  return text
    .replace(/```(json)?\n?/g, '') // Remove ```json and optional newline
    .replace(/```/g, '')         // Remove remaining ```
    .trim();                         // Trim leading/trailing whitespace
}

async function extractFieldsFromImageURL(imageUrl, docType) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  const imagePart = await urlToGenerativePart(imageUrl);

  let prompt = "";

  switch (docType) {
    case "incomeDoc":
      prompt = `From this income certificate image, extract the information. Return the extracted information as JSON with the following fields:
      {
         "IncomeAmount": "", //convert from Marathi to English and format as a number there should be no commas
         "CertificateNo": "", //convert from Marathi to English
         "IncomeIssuingAuthority":"", //eg: "Talathi", "Tehsildar", "District Collector" convert from Marathi to english
         "Incomecertificateissueddate":"" //eg: िदनांक : 11/08/2024

      }`;
      break;

    case "casteDoc":
      prompt = `From this caste certificate image, extract the following in English and return as JSON:
      {
        "Caste": "",
        "CasteCertificateNumber": "",
        "IssuingDistrict": "",
        "ApplicantName": "",
        "IssuingAuthority": "", //eg: "Talathi", "Tehsildar", "District Collector"
        "CasteIssuingDate": ""
      }`;
      break;

    case "domicileDoc":
      prompt = `From this domicile certificate image, extract the following in English and return as JSON:
      {
        "DomicileCertificateNo": "", 
        "DomicileApplicantName": "", //in name dont add kumar or kumari
        "DomicileIssuingAuthority": "", //eg: "Talathi", "Tehsildar", "District Collector", "Executive Magistrate"  
        "DomicileIssuingDate": "",
      }`;
      break;

    case "capAllotmentLetter":
      prompt = `From this CAP Allotment Letter image, extract these fields in English and return as JSON:
      {
        "CasteCategory": "",
        "DisabilityofanyType": "",
        "CourseName": "",
        "CETMeritPercentage": "",        
        "AdmissionApplicationID": "",
        "AppliedforEWS": "",
        "InstituteName": "", //eg: "06203-Annasaheb Dange College of Engineering and Technology, Ashta Sangli" 
        "DateOfAdmission": ""
        "MeritNo": "",
        "SeatType": "",
        "AdmissionLevel": "" //eg: "UG", "PG" search for this in the header of the document,
        "Gender": "",
              }`;
      break;
      
      case "class10Doc":
        prompt = `From this CAP Allotment Letter image, extract these fields in English and return as JSON:
        {
          "class10Board": "",
          "class10PassingYear": "",
          "class10Percentage": "",
          "class10SeatNumber": "",        
          "class10MonthOfExam": "",
          "class10MarksObtained": "",
                }`;
        break;

      case "class12Doc":
        prompt = `From this Class 12 marksheet image, extract these fields in English and return as JSON:
        {
          "class12Stream": "",           // e.g., Science, Commerce, Arts
          "class12Board": "",            // e.g., Maharashtra State Board
          "class12SeatNumber": "",       
          "class12PassingYear": "",      
          "class12Percentage": ""       
        }`;
        break;

        case "hostelDoc":
          prompt = `From this hostel admission document image, extract these fields in English and return as JSON:
          {
            "hostelState": "",           // e.g., Maharashtra
            "hostelDistrict": "",        // e.g., Pune
            "hostelTaluka": "",          // e.g., Haveli
            "hostelName": "",            // e.g., Government Hostel for Boys
            "hostelAddress": "",         // Full address line
            "hostelPincode": "",         // 6 digit pincode
            "hostelAdmissionDate": "",   // Format: DD/MM/YYYY
            "hostelType": ""             // e.g., Government, Private
          }`;
          break;

          case "disabilityDoc":
            prompt = `From this disability certificate image, extract these fields in English and return as JSON:
            {
              "disabilityType": "",             // e.g., Visual Impairment, Hearing Impairment
              "disabilityName": "",             // Full name of the person
              "disabilityCertificateNo": "",    // Certificate number
              "disabilityPercentage": "",       // e.g., 40%, 75%
              "disabilityIssuedDate": "",       // Format: DD/MM/YYYY
              "disabilityIssuingAuthority": ""  // Authority who issued the certificate
            }`;
            break;
          
  

    default:
      prompt = `From this document image, extract this information in English and return as JSON:
      {
        "Name": ""
      }`;
      break;
  }

  // Get the generated content from Gemini model
  const result = await model.generateContent([prompt, imagePart]);
  const response = await result.response;
  const rawText = await response.text();
  const cleanedText = cleanGeminiJSON(rawText);

  try {
    const parsed = JSON.parse(cleanedText);

    // Handle different docTypes and map fields accordingly
    switch (docType) {
      case "incomeDoc":
        const { IncomeAmount, CertificateNo, IncomeIssuingAuthority, Incomecertificateissueddate, ...restIncome } = parsed;
        return {
          ...restIncome,
          annualFamilyIncome: IncomeAmount || "",
          incomeCertNo: CertificateNo || "",
          incomeIssAuthority: normalizeAuthority(IncomeIssuingAuthority || ""),
          incomeIssuedDate: Incomecertificateissueddate || ""
        };

        case "casteDoc":
          const {
            CasteCertificateNumber,
            IssuingDistrict,
            ApplicantName,
            IssuingAuthority,
            CasteIssuingDate,
            ...restCaste
          } = parsed;
          return {
            ...restCaste,
            casteCertificateNumber: CasteCertificateNumber || "",
            casteIssuedDistrict: IssuingDistrict || "",
            casteApplicantName: ApplicantName || "",
            casteIssAuthority: normalizeAuthority(IssuingAuthority) || "",
            casteIssuedDate: CasteIssuingDate || ""
          };
        

      case "domicileDoc":
        const { DomicileCertificateNo, DomicileApplicantName, DomicileIssuingAuthority,DomicileIssuingDate, ...restDomicile } = parsed;
        return {
          ...restDomicile,
          domicileCertNumber: DomicileCertificateNo || "",
          domicileApplicantName: DomicileApplicantName || "",
          domicileIssuedAuthority: normalizeAuthority(DomicileIssuingAuthority) || "",
          domicileIssuedDate: DomicileIssuingDate || ""

        };

      case "capAllotmentLetter":
        const { DisabilityofanyType, CourseName, CETMeritPercentage, AdmissionApplicationID, InstituteName, DateOfAdmission,
                Gender,  ...restCap } = parsed;
        return {
          ...restCap,
          doYouHaveDisability: DisabilityofanyType || "",
          courseName: CourseName || "",
          cetPercentage: CETMeritPercentage || "",
          admissionApplicationId: AdmissionApplicationID || "",
          instituteName: InstituteName || "",
          admissionDate: DateOfAdmission || "",
          gender: Gender || ""
          //unable to map AppliedforEWS,meritNo, seatType, admissionLevel
        };

      case "class10Doc":
        const {
          class10Board,
          class10PassingYear,
          class10Percentage,
          class10SeatNumber,
          class10MonthOfExam,
          class10MarksObtained,
          ...restClass10
        } = parsed;
        return {
          ...restClass10,
          class10Board: class10Board || "",
          class10PassingYear: class10PassingYear || "",
          class10Percentage: class10Percentage || "",
          class10SeatNumber: class10SeatNumber || "",
          class10MonthOfExam: class10MonthOfExam || "",
          class10MarksObtained: class10MarksObtained || ""
        };

        case "class12Doc":
          const {
            class12Stream,
            class12Board,
            class12SeatNumber,
            class12PassingYear,
            class12Percentage,
            ...restClass12
          } = parsed;
          return {
            ...restClass12,
            class12Stream: class12Stream || "",
            class12Board: class12Board || "",
            class12SeatNumber: class12SeatNumber || "",
            class12PassingYear: class12PassingYear || "",
            class12Percentage: class12Percentage || ""
          };

          case "hostelDoc":
            const {
              hostelState,
              hostelDistrict,
              hostelTaluka,
              hostelName,
              hostelAddress,
              hostelPincode,
              hostelAdmissionDate,
              hostelType,
              ...restHostel
            } = parsed;
            return {
              ...restHostel,
              hostelState: hostelState || "",
              hostelDistrict: hostelDistrict || "",
              hostelTaluka: hostelTaluka || "",
              hostelName: hostelName || "",
              hostelAddress: hostelAddress || "",
              hostelPincode: hostelPincode || "",
              hostelAdmissionDate: hostelAdmissionDate || "",
              hostelType: hostelType || ""
            };
            case "disabilityDoc":
              const {
                disabilityType,
                disabilityName,
                disabilityCertificateNo,
                disabilityPercentage,
                disabilityIssuedDate,
                disabilityIssuingAuthority,
                ...restDisability
              } = parsed;
              return {
                ...restDisability,
                disabilityType: disabilityType || "",
                disabilityName: disabilityName || "",
                disabilityCertificateNo: disabilityCertificateNo || "",
                disabilityPercentage: disabilityPercentage || "",
                disabilityIssuedDate: disabilityIssuedDate || "",
                disabilityIssuingAuthority: disabilityIssuingAuthority || ""
              };
            
  


      default:
        return parsed;  // If the docType is unknown, just return the raw parsed content
    }

  } catch (e) {
    console.error("❌ Failed to parse Gemini response:", rawText);
    return {};  // Return empty if there's an error
  }
}


module.exports = { extractFieldsFromImageURL };





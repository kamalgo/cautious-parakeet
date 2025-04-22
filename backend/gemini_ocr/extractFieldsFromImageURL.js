const axios = require("axios");
const { GoogleGenerativeAI } = require("@google/generative-ai");

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
        "IncomeAmount": "", 
        "CertificateNo": "",
        "IncomeIssuingAuthority": "",
        "Incomecertificateissueddate": ""
      }`;
      break;

    case "casteDoc":
      prompt = `From this caste certificate image, extract the following in English and return as JSON:
      {
        "Caste": "",
        "CasteCertificateNumber": "",
        "IssuingDistrict": "",
        "ApplicantName": "",
        "IssuingAuthority": "",
        "CasteIssuingDate": ""
      }`;
      break;

    case "domicileDoc":
      prompt = `From this domicile certificate image, extract the following in English and return as JSON:
      {
        "Name": "",
        "State": "",
        "IssueDate": ""
      }`;
      break;

    case "capAllotmentLetter":
      prompt = `From this CAP Allotment Letter image, extract these fields in English and return as JSON:
      {
        "Religion": "",
        "InstituteName": "",
        "CourseName": "",
        "DateOfAdmission": "",
        "MeritNo": "",
        "SeatType": "",
        "AdmissionLevel": ""
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
          incomeIssAuthority: IncomeIssuingAuthority || "",
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
            casteIssAuthority: IssuingAuthority || "",
            casteIssuedDate: CasteIssuingDate || ""
          };
        

      case "domicileDoc":
        const { Name, State, IssueDate, ...restDomicile } = parsed;
        return {
          ...restDomicile,
          name: Name || "",
          state: State || "",
          issueDate: IssueDate || ""
        };

      case "capAllotmentLetter":
        const { Religion, InstituteName, CourseName, DateOfAdmission, MeritNo, SeatType, AdmissionLevel, ...restCap } = parsed;
        return {
          ...restCap,
          religion: Religion || "",
          instituteName: InstituteName || "",
          courseName: CourseName || "",
          dateOfAdmission: DateOfAdmission || "",
          meritNo: MeritNo || "",
          seatType: SeatType || "",
          admissionLevel: AdmissionLevel || ""
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



// async function extractFieldsFromImageURL(imageUrl, docType) {
//   const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
//   const imagePart = await urlToGenerativePart(imageUrl);

//   let prompt = "";

//   switch (docType) {
//     case "incomeDoc":
//       prompt = `From this income certificate image, extract the information. Return the extracted information as JSON with the following fields:
//       {
//         "IncomeAmount": "", //convert from Marathi to English and format as a number there should be no commas
//         "CertificateNo": "", //convert from Marathi to English
//         "IncomeIssuingAuthority":"", //eg: "Talathi", "Tehsildar", "District Collector" convert from Marathi to english
//         "Incomecertificateissueddate":"" //eg: िदनांक : 11/08/2024
//       }`;
//       break;

//     case "domicileDoc":
//       prompt = `From this domicile certificate image, extract the following in English and return as JSON:
//       {
//         "Name": "",
//         "State": "",
//         "IssueDate": ""
//       }`;
//       break;

//     case "capAllotmentLetter":
//       prompt = `From this CAP Allotment Letter image, extract these fields in English and return as JSON:
//       {
//         "Religion": "",
//         "InstituteName": "",
//         "CourseName": "",
//         "DateOfAdmission": "",
//         "MeritNo": "",
//         "SeatType": "",
//         "AdmissionLevel": "",
//         ""
//       }`;
//       break;

//     case "casteDoc":
//       prompt = `From this caste certificate image, extract the following in English and return as JSON:
//       {
//         "Caste": "",
//         "CasteCertificateNumber": "",
//         "IssuingDistrict": "",
//         "ApplicantName": "",
//         "IssuingAuthority": "",
//         "CasteIssuingDate": "",
//       }`;
//       break;

//     default:
//       prompt = `From this document image, extract this information in English and return as JSON:
//       {
//         "Name": ""
//       }`;
//       break;
//   }

//   const result = await model.generateContent([prompt, imagePart]);
//   const response = await result.response;
//   const rawText = await response.text();
//   const cleanedText = cleanGeminiJSON(rawText);

//   try {
//     const parsed = JSON.parse(cleanedText);

//     // 🛠️ Remap fields for incomeDoc
//     if (docType === "incomeDoc") {
//       const { IncomeAmount, CertificateNo,IncomeIssuingAuthority,Incomecertificateissueddate, ...rest } = parsed;
//       return {
//         ...rest,
//         annualFamilyIncome: IncomeAmount || "",
//         incomeCertNo: CertificateNo || "",
//         incomeIssAuthority: IncomeIssuingAuthority || "",
//         incomeIssuedDate: Incomecertificateissueddate || "",
//       };
//     }

//     if (docType === "casteDoc") {
//       const {
//         casteCertNo,
//         casteIssuedDistrict,
//         casteApplicantName,
//         casteIssAuthority,
//         casteIssuedDate,
//         ...rest
//       } = parsed;
    
//       return {
//         ...rest,
//         casteCertificateNumber: casteCertNo || "",
//         casteIssuedDistrict: casteIssuedDistrict || "",
//         casteApplicantName: casteApplicantName || "",
//         casteIssAuthority: casteIssAuthority || "",
//         casteIssuedDate: casteIssuedDate || "",
//       };
//     }
    

//     return parsed;
//   } catch (e) {
//     console.error("❌ Failed to parse Gemini response:", rawText);
//     return {};
//   }
// }

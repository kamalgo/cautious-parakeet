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
        "IncomeAmount": "", //convert from Marathi to English and format as a number there should be no commas
        "CertificateNo": "", //convert from Marathi to English
        "IncomeIssuingAuthority":"", //eg: "Talathi", "Tehsildar", "District Collector" convert from Marathi to english
        "Incomecertificateissueddate":"" //eg: िदनांक : 11/08/2024
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
        "Name": "",
        "InstituteName": "",
        "CourseName": "",
        "DateOfAdmission": "",
        "MeritNo": "",
        "SeatType": "",
        "AdmissionLevel": ""
      }`;
      break;

    case "casteDoc":
      prompt = `From this caste certificate image, extract the following in English and return as JSON:
      {
        "Name": "",
        "Caste": "",
        "CasteCategory": ""
      }`;
      break;

    default:
      prompt = `From this document image, extract this information in English and return as JSON:
      {
        "Name": ""
      }`;
      break;
  }

  const result = await model.generateContent([prompt, imagePart]);
  const response = await result.response;
  const rawText = await response.text();
  const cleanedText = cleanGeminiJSON(rawText);

  try {
    const parsed = JSON.parse(cleanedText);

    // 🛠️ Remap fields for incomeDoc
    if (docType === "incomeDoc") {
      const { IncomeAmount, CertificateNo,IncomeIssuingAuthority,Incomecertificateissueddate, ...rest } = parsed;
      return {
        ...rest,
        annualFamilyIncome: IncomeAmount || "",
        incomeCertNo: CertificateNo || "",
        incomeIssAuthority: IncomeIssuingAuthority || "",
        incomeIssuedDate: Incomecertificateissueddate || "",
      };
    }

    return parsed;
  } catch (e) {
    console.error("❌ Failed to parse Gemini response:", rawText);
    return {};
  }
}

module.exports = { extractFieldsFromImageURL };




// const axios = require("axios");
// const { GoogleGenerativeAI } = require("@google/generative-ai");

// const genAI = new GoogleGenerativeAI("AIzaSyD0ANJ4hfTwNnxwh-mUUQ70yPSfZfC_9hc");

// async function urlToGenerativePart(imageUrl, mimeType = "image/jpeg") {
//   const response = await axios.get(imageUrl, {
//     responseType: "arraybuffer",
//   });

//   const base64Image = Buffer.from(response.data, "binary").toString("base64");

//   return {
//     inlineData: {
//       data: base64Image,
//       mimeType,
//     },
//   };
// }

// // Helper to clean Gemini's markdown-wrapped JSON
// function cleanGeminiJSON(text) {
//   return text
//     .replace(/```json\n?/g, '') // Remove ```json
//     .replace(/```/g, '')         // Remove closing ```
//     .trim();
// }

// async function extractFieldsFromImageURL(imageUrl) {
//   const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
//   const imagePart = await urlToGenerativePart(imageUrl);

//   const prompt = `From this image, extract only the "Name" field and return JSON like:
// {
//   "Name": ""
// }`;

// //   const prompt = `From this image extract the following fields in JSON format:
// //   {
// //     "Name": "",
// //     "Gender": "",
// //     "DateOfBirth": "",
// //     "Category": "",
// //     "InstituteName": "",
// //     "CourseName": "",
// //     "DateOfAdmission": "",
// //     "Merit No": "",
// //     "Seat Type": "",
// //     "AdmissionLevel": ""
// //   }

// // If any field is missing, leave it blank.`;

//   const result = await model.generateContent([prompt, imagePart]);
//   const response = await result.response;
//   const rawText = await response.text();
//   const cleanedText = cleanGeminiJSON(rawText);

//   try {
//     return JSON.parse(cleanedText);
//   } catch (e) {
//     console.error("❌ Failed to parse Gemini response:", rawText);
//     return {};
//   }
// }

// module.exports = { extractFieldsFromImageURL };


// this file is created to test the update query for mahadabt_profile table in DB 
//update the row data through email
//testing using POSTMAN

const { Sequelize, Op } = require("sequelize");
const Mahadbtprofiles = require("../models/mahadbtModel");
const mahadbtProfilesBot = require("../models/mahadbtModel_Bot");
const MahadbtRenewal = require("../models/mahadbtRenewalModel");
const shravani_allcolumns = require("../models/shravaniAllColumnsModel");
const { extractFieldsFromImageURL } = require("../gemini_ocr/extractFieldsFromImageURL");
const moment = require('moment');


// exports.UPTA = async (req, res) => {
//   try {
//     const { aadhaar_number, capAllotmentLetter, confirmOCR } = req.body;

//     // 1. If image is uploaded but not confirmed, trigger Gemini and respond back
//     if (capAllotmentLetter && confirmOCR !== true) {
//       const extractedFields = await extractFieldsFromImageURL(capAllotmentLetter);

//       return res.status(200).json({
//         success: true,
//         message: "Fields extracted from image. Ask student to confirm.",
//         extractedFields,
//       });
//     }

//     // 2. If OCR is confirmed by user, save the data
//     if (confirmOCR === true && capAllotmentLetter) {
//       const extractedFields = await extractFieldsFromImageURL(capAllotmentLetter);

//       await shravani_allcolumns.update(extractedFields, {
//         where: { aadhaar_number },
//       });

//       return res.status(200).json({
//         success: true,
//         message: "OCR confirmed. Data saved.",
//       });
//     }

//     // 3. Default update for other fields
//     await shravani_allcolumns.update(req.body, {
//       where: { aadhaar_number },
//     });

//     res.status(200).json({
//       success: true,
//       message: "Data updated.",
//     });

//   } catch (err) {
//     console.error("Error in UPTA controller:", err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

//UPTE update profile through email
// exports.UPTE = async (req, res) => {
//     Mahadbtprofiles.update(req.body, {
//       // Specify the condition for the update
//       where: {
//         email: req.body.email,
//       },
//     })
//       .then((result) => {
//         console.log("result", result);
//         console.log("email", req.body.id);

//         // The result is an array where the first element is the number of updated rows
//         return res.status(200).json({
//           success: true,
//           message: `${result[0]} row(s) updated`,
//         });
//       })
//       .catch((error) => {
//         console.error("Error updating records:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//       });
//   };      
/////////////////////////////////////////////////////////////////////////////////////////////////////
exports.UPTA = async (req, res) => {
  try {
    const { aadhaar_number, ...rest } = req.body;

    if (!aadhaar_number) {
      return res.status(400).json({
        success: false,
        message: "aadhaar_number is required",
      });
    }

    const documentFields = ["casteDoc", "incomeDoc", "domicileDoc", "capAllotmentLetter", "class10Doc", "class12Doc", "hostelDoc", "disabilityDoc"];
    const updateFields = {};

    for (const [key, value] of Object.entries(rest)) {
      console.log(`Processing ${key}:`, value); // Debugging line to log document fields
      if (documentFields.includes(key)) {
        const extracted = await extractFieldsFromImageURL(value, key);
        console.log(`📄 Extracted fields from ${key}:`, extracted); // Debugging line for extracted fields

        if (!extracted || Object.keys(extracted).length === 0) {
          return res.status(422).json({
            success: false,
            message: `Could not extract any data from ${key}`,
          });
        }

        // Add the extracted fields to updateFields, including the image URL
        if (key === "incomeDoc") {
          updateFields.incomeDoc = value; // Save the image URL (value is the image URL)
          updateFields.annualFamilyIncome = extracted.annualFamilyIncome;
          updateFields.incomeCertNo = extracted.incomeCertNo;
          updateFields.incomeIssAuthority = extracted.incomeIssAuthority;
          updateFields.doYouHaveIncomeCertificate = "Yes";
          updateFields.incomeCertHasBarcode = "No";
          if (extracted.incomeIssuedDate) {
            const formattedDate = moment(extracted.incomeIssuedDate, 'DD/MM/YYYY').format('YYYY-MM-DD');
            updateFields.incomeIssuedDate = formattedDate;
          } else {
            updateFields.incomeIssuedDate = null;
          }
        } else if (key === "casteDoc") {
          updateFields.casteDoc = value; // Save the image URL (value is the image URL)
          updateFields.subCaste = extracted.subCaste;
          updateFields.casteCertificateNumber = extracted.casteCertificateNumber;
          updateFields.casteIssuedDistrict = extracted.casteIssuedDistrict;
          updateFields.casteApplicantName = extracted.casteApplicantName;
          updateFields.casteIssAuthority = extracted.casteIssAuthority;
          updateFields.doYouHaveCasteCertificate = "Yes";
          updateFields.casteCertHasBarcode = "No";

          updateFields.casteCategory = extracted.casteCategory;
          if (extracted.casteIssuedDate) {
            const formattedDate = moment(extracted.casteIssuedDate, 'DD/MM/YYYY').format('YYYY-MM-DD');
            updateFields.casteIssuedDate = formattedDate;
          } else {
            updateFields.casteIssuedDate = null;
          }
        } else if (key === "domicileDoc") {
          updateFields.domicileDoc = value; // Save the image URL (value is the image URL)
          updateFields.domicileCertNumber = extracted.domicileCertNumber;
          updateFields.domicileApplicantName = extracted.domicileApplicantName;
          updateFields.domicileIssuedAuthority = extracted.domicileIssuedAuthority;
          updateFields.doYouHaveDomicileCertificate = "Yes";
          updateFields.doYouHaveDomicileMaharashtraKarnataka = "Yes";
          updateFields.domicileCertHasBarcode = "No";
          if (extracted.domicileIssuedDate) {
            const formattedDate = moment(extracted.domicileIssuedDate, 'DD/MM/YYYY').format('YYYY-MM-DD');
            updateFields.domicileIssuedDate = formattedDate;
          } else {
            updateFields.domicileIssuedDate = null;
          }
        } else if (key === "capAllotmentLetter") {
          updateFields.capAllotmentLetter = value; // Save the image URL (value is the image URL)
          updateFields.qualificationLevel = extracted.qualificationLevel;
          updateFields.doYouHaveDisability = extracted.doYouHaveDisability;
          updateFields.courseName = extracted.courseName;
          updateFields.cetPercentage = extracted.cetPercentage;
          updateFields.admissionApplicationId = extracted.admissionApplicationId;
          updateFields.instituteName = extracted.instituteName;
          updateFields.gender = extracted.gender;
          updateFields.admissionYear = extracted.admissionYear;  
          updateFields.instituteState = extracted.instituteState;    
          updateFields.instituteDistrict = extracted.instituteDistrict;    
          updateFields.instituteTaluka = extracted.instituteTaluka;  
          updateFields.admissionCategory = extracted.admissionCategory;  
          if (extracted.admissionDate) {
            const formattedDate = moment(extracted.admissionDate, 'DD/MM/YYYY').format('YYYY-MM-DD');
            updateFields.admissionDate = formattedDate;
          } else {
            updateFields.admissionDate = null;
          }
        } else if (key === "class10Doc") {
          updateFields.class10Doc = value; // Save the image URL (value is the image URL)
          updateFields.class10Board = extracted.class10Board;
          updateFields.class10PassingYear = extracted.class10PassingYear;
          updateFields.class10Percentage = extracted.class10Percentage;
          updateFields.class10SeatNumber = extracted.class10SeatNumber;
          updateFields.class10MonthOfExam = extracted.class10MonthOfExam;
          updateFields.class10MarksObtained = extracted.class10MarksObtained;
          updateFields.class10Qualification = "S.S.C. (10 Std)";
          updateFields.class10Stream = "21"; // check with shravani once
          updateFields.class10State = extracted.class10State;
          updateFields.class10Course = "SSC";
          updateFields.class10Mode = "Regular";
          updateFields.class10Result = "Passed";
          updateFields.class10Attempt = "1";

          
        } else if (key === "class12Doc") { // ✅ Properly nested "else if"
          updateFields.class12Doc = value; // Save the image URL (value is the image URL)
          updateFields.class12Stream = extracted.class12Stream;
          updateFields.class12Board = extracted.class12Board;
          updateFields.class12SeatNumber = extracted.class12SeatNumber;
          updateFields.class12PassingYear = extracted.class12PassingYear;
          updateFields.class12Percentage = extracted.class12Percentage;
          updateFields.class12QualificationLevel = "H.S.C. (12 Std)";
          updateFields.class12Course = "H.S.C. (12 Std)";
          updateFields.class12Mode = "Regular";
          updateFields.class12Result = "Passed";
          updateFields.class12Attempts = "1";


          
        }
        else if (key === "hostelDoc") {
          updateFields.hostelDoc = value; // Save the image URL (value is the image URL)
          updateFields.hostelState = extracted.hostelState;
          updateFields.hostelDistrict = extracted.hostelDistrict;
          updateFields.hostelTaluka = extracted.hostelTaluka;
          updateFields.hostelName = extracted.hostelName;
          updateFields.hostelAddress = extracted.hostelAddress;
          updateFields.hostelPincode = extracted.hostelPincode;
          updateFields.hostelType = extracted.hostelType;
          updateFields.areYouHostellerDayScholar = "Hosteller";
          if (extracted.hostelAdmissionDate) {
            const formattedDate = moment(extracted.hostelAdmissionDate, 'DD/MM/YYYY').format('YYYY-MM-DD');
            updateFields.hostelAdmissionDate = formattedDate;
          } else {
            updateFields.hostelAdmissionDate = null;
          }
        } else if (key === "disabilityDoc") {
          updateFields.disabilityDoc = value; // Save the image URL (value is the image URL)
          updateFields.disabilityType = extracted.disabilityType;
          updateFields.disabilityName = extracted.disabilityName;
          updateFields.disabilityCertificateNo = extracted.disabilityCertificateNo;
          updateFields.disabilityPercentage = extracted.disabilityPercentage;
          updateFields.disabilityIssuingAuthority = extracted.disabilityIssuingAuthority;
          updateFields.doYouHaveDisability = "Yes";
          updateFields.doYouHaveDisabilityCertificate = "Yes";          
          if (extracted.disabilityIssuedDate) {
            const formattedDate = moment(extracted.disabilityIssuedDate, 'DD/MM/YYYY').format('YYYY-MM-DD');
            updateFields.disabilityIssuedDate = formattedDate;
          } else {
            updateFields.disabilityIssuedDate = null;
          }
        }

      } else {
        updateFields[key] = value; // For other fields, just add them as is
      }
    }


    // Ensure that there are fields to update
    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No updatable fields found",
      });
    }

    // Debugging to check the update result
    const updateResult = await shravani_allcolumns.update(updateFields, {
      where: { aadhaar_number },
    });

    console.log("Update result:", updateResult);

    // Check if any rows were updated
    if (updateResult[0] === 0) {
      return res.status(400).json({
        success: false,
        message: "No rows were updated.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Data extracted and/or updated successfully.",
    });

  } catch (err) {
    console.error("Error in UPTA controller:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//////////////////////////////////////////////////////////////////////////////


exports.getStudentDocInfo = async (req, res) => {
  try {
    const { aadhaar_number, docType } = req.query;

    if (!aadhaar_number || !docType) {
      return res.status(400).json({ message: "Aadhaar number and docType are required" });
    }

    const student = await shravani_allcolumns.findOne({ where: { aadhaar_number } });

    if (!student) {
      return res.status(404).json({ message: "Student not found with provided Aadhaar" });
    }

    // Define the supported document fields
    const documentFields = {
      incomeDoc: ["annualFamilyIncome", "incomeCertNo", "incomeIssAuthority", "incomeIssuedDate", "name"],
      casteDoc: ["casteCertificateNumber", "casteIssuedDistrict", "casteApplicantName", "casteIssAuthority", "casteIssuedDate", "subCaste","casteCategory"],
      domicileDoc: ["domicileCertNumber", "domicileApplicantName", "domicileIssuedAuthority", "domicileIssuedDate"],
      disabilityDoc: ["disabilityPercent", "disabilityCertNo", "disabilityIssAuthority", "disabilityIssuedDate", "name"],
      capAllotmentLetter: ["doYouHaveDisability", "courseName", "cetPercentage", "admissionApplicationId", "instituteName", "gender", "admissionDate", "qualificationLevel","admissionYear","instituteState", "instituteDistrict", "instituteTaluka", "admissionCategory"],
      class10Doc: ["class10Board", "class10PassingYear", "class10Percentage", "class10SeatNumber", "class10MonthOfExam", "class10MarksObtained"],
      class12Doc: ["class12Stream", "class12Board", "class12SeatNumber", "class12PassingYear", "class12Percentage"],
      hostelDoc: ["hostelState", "hostelDistrict", "hostelTaluka", "hostelName", "hostelAddress", "hostelPincode", "hostelAdmissionDate", "hostelType"],
      disabilityDoc: ["disabilityType", "disabilityName", "disabilityCertificateNo", "disabilityPercentage", "disabilityIssuingAuthority", "disabilityIssuedDate"]
      // Add other document types and their respective fields here
    };

    if (!documentFields[docType]) {
      return res.status(400).json({ message: "Invalid docType provided" });
    }

    const responseData = {};
    documentFields[docType].forEach(field => {
      responseData[field] = student[field] || null;
    });

    console.log(`🟢 Extracted ${docType} Data:`, responseData);

    return res.status(200).json({
      message: `Extracted ${docType} data successfully`,
      data: responseData
    });

  } catch (err) {
    console.error("🔴 Error in getStudentDocInfo:", err.message, err.stack);
    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message
    });
  }
};

// exports.getIncomeInfo = async (req, res) => {
//   try {
//     const { aadhaar_number } = req.query;

//     // Basic validation
//     if (!aadhaar_number) {
//       return res.status(400).json({ message: "Aadhaar number is required" });
//     }

//     const student = await shravani_allcolumns.findOne({ where: { aadhaar_number } });

//     if (!student) {
//       return res.status(404).json({ message: "Student not found with provided Aadhaar" });
//     }

//     const { name, annualFamilyIncome, incomeCertNo, incomeIssAuthority,incomeIssuedDate } = student;

//       // Log the extracted data
//       console.log("🟢 Extracted Income Certificate Data:", {
//         Name: name,
//         Income: annualFamilyIncome,
//         CertificateNumber: incomeCertNo,
//         incomeIssuingAuthority: incomeIssAuthority,
//         Incomedate: incomeIssuedDate,


//       });

//     return res.status(200).json({
//       message: "Extracted Income Certificate Data",
//       console: "Data fetched successfully",
//       data: {
//         Name: name,
//         Income: annualFamilyIncome,
//         CertificateNumber: incomeCertNo
//       }
//     });
//   } catch (err) {
//     console.error("🔴 Error in getIncomeInfo:", err.message, err.stack);
//     return res.status(500).json({ 
//       message: "Internal Server Error", 
//       error: err.message 
//     });
//   }
// };


/////////////////////////////////////////////////////////////////
exports.handleStudentResponse = async (req, res) => {
  const { aadhaar, response } = req.body; // 'response' is expected to be "yes" or "no"

  try {
    const student = await db.Student.findOne({ where: { aadhaar } });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    if (response.toLowerCase() === "no") {
      await student.destroy();
      return res.json({ message: "Info deleted as per student request." });
    }

    return res.json({ message: "Info kept. Student confirmed it's correct." });
  } catch (err) {
    console.error("🔴 Error in handleStudentResponse:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/////////////////////////////////////////////////////////////////////////////////////////////
exports.getScholarshipSuggestions = async (req, res) => {

  const schemeToDeptMap = {
  "Rajashri Chhatrapati Shahu Maharaj Scholarship": "Directorate of Higher Education",
  "Dr. Panjabrao Deshmukh Hostel Maintenance Scholarship": "Directorate of Technical Education",
  "Post Matric Scholarship for OBC Students": "OBC, SEBC, VJNT & SBC Welfare Department",
  "Tution fees and examination fees to OBC Students": "OBC, SEBC, VJNT & SBC Welfare Department",
  "Post matric to sbc students": "OBC, SEBC, VJNT & SBC Welfare Department",
  "Payment of maintenance allowance to VJNT and SBC students": "OBC, SEBC, VJNT & SBC Welfare Department",
  "Tution fees and examination fees to SBC Students": "OBC, SEBC, VJNT & SBC Welfare Department",
  "Post matric to VJNT students": "OBC, SEBC, VJNT & SBC Welfare Department",
  "Tution fees and examination fees to VJNT Students": "OBC, SEBC, VJNT & SBC Welfare Department",
  "Govt. of India Post Matric Scholarship for SC Students": "Social Justice and Special Assistance Department",
  "freeship for SC Students": "Social Justice and Special Assistance Department",
  "freeship for ST Students": "Tribal Development Department",
  "Maintenannce Allowance for Students studying in professional courses": "Social Justice and Special Assistance Department"
};

  try {
    const { aadhaar_number } = req.body;

    if (!aadhaar_number) {
      return res.status(400).json({ message: "Aadhaar number is required" });
    }

    const student = await shravani_allcolumns.findOne({ where: { aadhaar_number } });

    if (!student) {
      return res.status(404).json({ message: "Student not found with provided Aadhaar" });
    }

    const { annualFamilyIncome, casteCategory, areYouHostellerDayScholar } = student;
    console.log("🟢 Student Data:", annualFamilyIncome,casteCategory,areYouHostellerDayScholar);

    const eligibleScholarships = [];

    // Normalize and prepare values
    const casteLower = (casteCategory || "").toLowerCase().trim();
    const hostellerStatus = (areYouHostellerDayScholar || "").toLowerCase().trim();
    // const isHosteller = hostellerStatus.includes("hostel") || hostellerStatus.includes("hosteller");

    console.log("Student Caste Category (normalized):", casteLower);


    const eligibleCastes = ['open', 'ebc', 'sebc'];
    const isEligibleCaste = eligibleCastes.includes(casteLower);
    const isHosteller = hostellerStatus === "hosteller";


// Scholarship 1: Rajashri Chhatrapati Shahu Maharaj Scholarship 
if (annualFamilyIncome < 800000 && isEligibleCaste) {
  eligibleScholarships.push({
    scheme: "Rajashri Chhatrapati Shahu Maharaj Scholarship",
    department: schemeToDeptMap["Rajashri Chhatrapati Shahu Maharaj Scholarship"] || "Unknown Department"
  });
}

// Scholarship 2: Dr. Panjabrao Deshmukh Hostel Maintenance Scholarship
if (annualFamilyIncome < 800000 && isEligibleCaste && isHosteller) {
  eligibleScholarships.push({
    scheme: "Dr. Panjabrao Deshmukh Hostel Maintenance Scholarship",
    department: schemeToDeptMap["Dr. Panjabrao Deshmukh Hostel Maintenance Scholarship"] || "Unknown Department"
  });
}

// Scholarship 3: Post Matric Scholarship for OBC Students
if (casteLower === "(obc) other backward class" && annualFamilyIncome < 150000) {
  eligibleScholarships.push({
    scheme: "Post Matric Scholarship for OBC Students",
    department: schemeToDeptMap["Post Matric Scholarship for OBC Students"] || "Unknown Department"
  });
}

// Scholarship 4: Tution fees and examination fees to OBC Students
if (casteLower === "(obc) other backward class" && annualFamilyIncome > 150000) {
  eligibleScholarships.push({
    scheme: "Tution fees and examination fees to OBC Students",
    department: schemeToDeptMap["Tution fees and examination fees to OBC Students"] || "Unknown Department"
  });
}

// Scholarship 5: Post matric to sbc students
if (casteLower === "(sbc) special backward class" && annualFamilyIncome < 150000) {
  eligibleScholarships.push({
    scheme: "Post matric to sbc students",
    department: schemeToDeptMap["Post matric to sbc students"] || "Unknown Department"
  });
}

// Scholarship 6: Payment of maintenance allowance to VJNT and SBC students
if ((casteLower === "(sbc) special backward class" || casteLower === "(vjnt) vimukta jat nomadic tribes") && annualFamilyIncome < 150000 && isHosteller) {
  eligibleScholarships.push({
    scheme: "Payment of maintenance allowance to VJNT and SBC students",
    department: schemeToDeptMap["Payment of maintenance allowance to VJNT and SBC students"] || "Unknown Department"
  });
}

// Scholarship 7: Tution fees and examination fees to SBC Students
if (casteLower === "(sbc) special backward class" && annualFamilyIncome > 150000) {
  eligibleScholarships.push({
    scheme: "Tution fees and examination fees to SBC Students",
    department: schemeToDeptMap["Tution fees and examination fees to SBC Students"] || "Unknown Department"
  });
}

// Scholarship 8: Post matric to VJNT students
if (casteLower === "(vjnt) vimukta jat nomadic tribes" && annualFamilyIncome < 150000) {
  eligibleScholarships.push({
    scheme: "Post matric to VJNT students",
    department: schemeToDeptMap["Post matric to VJNT students"] || "Unknown Department"
  });
}

// Scholarship 9: Tution fees and examination fees to VJNT Students
if (casteLower === "(vjnt) vimukta jat nomadic tribes" && annualFamilyIncome > 150000) {
  eligibleScholarships.push({
    scheme: "Tution fees and examination fees to VJNT Students",
    department: schemeToDeptMap["Tution fees and examination fees to VJNT Students"] || "Unknown Department"
  });
}

// Scholarship 10: GOVT. of India Post Matric Scholarship for SC Students
if (annualFamilyIncome < 250000 && casteLower === "(sc) scheduled caste") {
  eligibleScholarships.push({
    scheme: "Govt. of India Post Matric Scholarship for SC Students",
    department: schemeToDeptMap["Govt. of India Post Matric Scholarship for SC Students"] || "Unknown Department"
  });
}

// Scholarship 11: Freeship for SC Students
if (annualFamilyIncome > 250000 && casteLower === "(sc) scheduled caste" && isHosteller) {
  eligibleScholarships.push({
    scheme: "Freeship for SC Students",
    department: schemeToDeptMap["Freeship for SC Students"] || "Unknown Department"
  });
}

// Scholarship 12: Post Matric Scholarship for ST Students
if (casteLower === "(st) scheduled tribes") {
  eligibleScholarships.push({
    scheme: "Post Matric Scholarship for ST Students",
    department: schemeToDeptMap["Post Matric Scholarship for ST Students"] || "Unknown Department"
  });
}

// Scholarship 13: Maintenance allowance SC students
if (annualFamilyIncome < 250000 && casteLower === "(sc) scheduled caste" && isHosteller) {
  eligibleScholarships.push({
    scheme: "Maintenannce Allowance for Students studying in professional courses",
    department: schemeToDeptMap["Maintenannce Allowance for Students studying in professional courses"] || "Unknown Department"
  });
}

    console.log("🟢 Scholarship suggestions for student:", eligibleScholarships);

    return res.status(200).json({
      message: eligibleScholarships.length > 0
        ? "Eligible scholarships found"
        : "No scholarships found based on current criteria.",
      data: eligibleScholarships
    });

  } catch (error) {
    console.error("🔴 Error in getScholarshipSuggestions:", error.message, error.stack);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message
    });
  }
};

///////////////////////////////////////////////////////////////////////////////////////
//WA form demo 1
// This function updates the profile based on the Aadhaar number and demoform payload from the gallabox WA form
exports.waDemo = async (req, res) => {
  try {
    const { aadhaar_number, demoform } = req.body;  // Destructure aadhaar_number and demoform from the body

    // Map the demoform payload fields to your DB fields
    const dataToUpdate = {
      candidateName: demoform.screen_0_TextInput_0,           // Mapping screen_0_TextInput_0 to 'name'
      parentMobileNumber: demoform.screen_0_TextInput_1,  // Mapping screen_0_TextInput_1 to 'mobile_number'
      maritalStatus: demoform.screen_0_Dropdown_2?.split("_")[1], // Extracting marital status from '0_Married' -> 'Married'
    };

    // Update the profile based on the Aadhaar number
    const [updatedRows] = await shravani_allcolumns.update(dataToUpdate, {
      where: { aadhaar_number },  // Use aadhaar_number from the body
    });

    if (updatedRows) {
      return res.status(200).json({
        success: true,
        message: `${updatedRows} row(s) updated`,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Record not found for the given Aadhaar number",
      });
    }
  } catch (error) {
    console.error("Error updating records:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

///////////////////////////////////////////////////////////////////////////////////////////////////////
//Fathers info
exports.fathersform = async (req, res) => {
  try {
    const { aadhaar_number, demoform } = req.body;  // Destructure aadhaar_number and demoform from the body

    // Map the demoform payload fields to your DB fields
    const dataToUpdate = {
      fatherName: demoform.screen_0_TextInput_0,           // Mapping screen_0_TextInput_0 to 'name'
      fatherOccupation: demoform.screen_0_Dropdown_1?.split("_")[1], // Extracting marital status from '0_Married' -> 'Married'
    };

    // Update the profile based on the Aadhaar number
    const [updatedRows] = await shravani_allcolumns.update(dataToUpdate, {
      where: { aadhaar_number },  // Use aadhaar_number from the body
    });

    if (updatedRows) {
      return res.status(200).json({
        success: true,
        message: `${updatedRows} row(s) updated`,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Record not found for the given Aadhaar number",
      });
    }
  } catch (error) {
    console.error("Error updating records:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

//Mothers info
exports.mothersform = async (req, res) => {
  try {
    const { aadhaar_number, demoform } = req.body;  // Destructure aadhaar_number and demoform from the body

    // Map the demoform payload fields to your DB fields
    const dataToUpdate = {
      motherName: demoform.screen_0_TextInput_0,           // Mapping screen_0_TextInput_0 to 'name'
      motherOccupation: demoform.screen_0_Dropdown_1?.split("_")[1], // Extracting marital status from '0_Married' -> 'Married'
    };

    // Update the profile based on the Aadhaar number
    const [updatedRows] = await shravani_allcolumns.update(dataToUpdate, {
      where: { aadhaar_number },  // Use aadhaar_number from the body
    });

    if (updatedRows) {
      return res.status(200).json({
        success: true,
        message: `${updatedRows} row(s) updated`,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Record not found for the given Aadhaar number",
      });
    }
  } catch (error) {
    console.error("Error updating records:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};





/////////////////////////////////////////////////////////////////////////////////    
//This one is for mahadbt renewal v2 of UPTE
exports.renewalUPTA = async (req, res) => {
  try {
    const { aadhar_number, ...rest } = req.body;

    if (!aadhar_number) {
      return res.status(400).json({
        success: false,
        message: "aadhar_number is required",
      });
    }

    const documentFields = ["casteDoc", "incomeDoc", "domicileDoc", "capAllotmentLetter", "class10Doc", "class12Doc", "hostelDoc", "disabilityDoc"];
    const updateFields = {};

    for (const [key, value] of Object.entries(rest)) {
      console.log(`Processing ${key}:`, value); // Debugging line to log document fields
      if (documentFields.includes(key)) {
        const extracted = await extractFieldsFromImageURL(value, key);
        console.log(`📄 Extracted fields from ${key}:`, extracted); // Debugging line for extracted fields

        if (!extracted || Object.keys(extracted).length === 0) {
          return res.status(422).json({
            success: false,
            message: `Could not extract any data from ${key}`,
          });
        }

        // Add the extracted fields to updateFields, including the image URL
        if (key === "incomeDoc") {
          updateFields.incomeDoc = value; // Save the image URL (value is the image URL)
          updateFields.annualIncome = extracted.annualFamilyIncome;
          updateFields.incomeCertNumber = extracted.incomeCertNo;
          updateFields.incomeIssuingAuthority = extracted.incomeIssAuthority;
          updateFields.doYouHaveIncomeCertificate = "Yes";
          if (extracted.incomeIssuedDate) {
            const formattedDate = moment(extracted.incomeIssuedDate, 'DD/MM/YYYY').format('YYYY-MM-DD');
            updateFields.incomeIssueDate = formattedDate;
          } else {
            updateFields.incomeIssueDate = null;
          }
        } else if (key === "casteDoc") {
          updateFields.casteDoc = value; // Save the image URL (value is the image URL)
          updateFields.subCaste = extracted.subCaste;
          updateFields.casteCertificateNumber = extracted.casteCertificateNumber;
          updateFields.casteIssuedDistrict = extracted.casteIssuedDistrict;
          updateFields.casteApplicantName = extracted.casteApplicantName;
          updateFields.casteIssAuthority = extracted.casteIssAuthority;
          updateFields.doYouHaveCasteCertificate = "Yes";
          updateFields.casteCategory = extracted.casteCategory;
          if (extracted.casteIssuedDate) {
            const formattedDate = moment(extracted.casteIssuedDate, 'DD/MM/YYYY').format('YYYY-MM-DD');
            updateFields.casteIssuedDate = formattedDate;
          } else {
            updateFields.casteIssuedDate = null;
          }
        } else if (key === "domicileDoc") {
          updateFields.domicileDoc = value; // Save the image URL (value is the image URL)
          updateFields.domicileCertNumber = extracted.domicileCertNumber;
          updateFields.domicileApplicantName = extracted.domicileApplicantName;
          updateFields.domicileIssuedAuthority = extracted.domicileIssuedAuthority;
          updateFields.doYouHaveDomicileCertificate = "Yes";
          if (extracted.domicileIssuedDate) {
            const formattedDate = moment(extracted.domicileIssuedDate, 'DD/MM/YYYY').format('YYYY-MM-DD');
            updateFields.domicileIssuedDate = formattedDate;
          } else {
            updateFields.domicileIssuedDate = null;
          }
        } else if (key === "capAllotmentLetter") {
          updateFields.capAllotmentLetter = value; // Save the image URL (value is the image URL)
          updateFields.qualificationLevel = extracted.qualificationLevel;
          updateFields.courseName = extracted.courseName;
          updateFields.cetPercent = extracted.cetPercentage;
          updateFields.admissionApplicationId = extracted.admissionApplicationId;
          updateFields.instituteName = extracted.instituteName;
          updateFields.admissionYear = extracted.admissionYear;  
          updateFields.instituteState = extracted.instituteState;    
          updateFields.instituteDistrict = extracted.instituteDistrict;    
          updateFields.instituteTaluka = extracted.instituteTaluka;  
          updateFields.admissionCasteCateogary = extracted.admissionCategory;  
          if (extracted.admissionDate) {
            const formattedDate = moment(extracted.admissionDate, 'DD/MM/YYYY').format('YYYY-MM-DD');
            updateFields.admissionDate = formattedDate;
          } else {
            updateFields.admissionDate = null;
          }
        } else if (key === "class10Doc") {
          updateFields.class10Doc = value; // Save the image URL (value is the image URL)
          updateFields.class10Board = extracted.class10Board;
          updateFields.class10PassingYear = extracted.class10PassingYear;
          updateFields.class10Percentage = extracted.class10Percentage;
          updateFields.class10SeatNumber = extracted.class10SeatNumber;
          updateFields.class10MonthOfExam = extracted.class10MonthOfExam;
          updateFields.class10MarksObtained = extracted.class10MarksObtained;
        } else if (key === "class12Doc") { // ✅ Properly nested "else if"
          updateFields.class12Doc = value; // Save the image URL (value is the image URL)
          updateFields.class12Stream = extracted.class12Stream;
          updateFields.class12Board = extracted.class12Board;
          updateFields.class12SeatNumber = extracted.class12SeatNumber;
          updateFields.class12PassingYear = extracted.class12PassingYear;
          updateFields.class12Percentage = extracted.class12Percentage;
        }
        else if (key === "hostelDoc") {
          updateFields.hostelDoc = value; // Save the image URL (value is the image URL)
          updateFields.hostelState = extracted.hostelState;
          updateFields.hostelDistrict = extracted.hostelDistrict;
          updateFields.hostelTaluka = extracted.hostelTaluka;
          updateFields.hostelName = extracted.hostelName;
          updateFields.hostelAddress = extracted.hostelAddress;
          updateFields.hostelPincode = extracted.hostelPincode;
          updateFields.hostelType = extracted.hostelType;
          updateFields.areYouHostellerDayScholar = "Hosteller";
          if (extracted.hostelAdmissionDate) {
            const formattedDate = moment(extracted.hostelAdmissionDate, 'DD/MM/YYYY').format('YYYY-MM-DD');
            updateFields.hostelAdmissionDate = formattedDate;
          } else {
            updateFields.hostelAdmissionDate = null;
          }
        } else if (key === "disabilityDoc") {
          updateFields.disabilityDoc = value; // Save the image URL (value is the image URL)
          updateFields.disabilityType = extracted.disabilityType;
          updateFields.disabilityName = extracted.disabilityName;
          updateFields.disabilityCertificateNo = extracted.disabilityCertificateNo;
          updateFields.disabilityPercentage = extracted.disabilityPercentage;
          updateFields.disabilityIssuingAuthority = extracted.disabilityIssuingAuthority;
          updateFields.doYouHaveDisability = "Yes";
          updateFields.doYouHaveDisabilityCertificate = "Yes";          
          if (extracted.disabilityIssuedDate) {
            const formattedDate = moment(extracted.disabilityIssuedDate, 'DD/MM/YYYY').format('YYYY-MM-DD');
            updateFields.disabilityIssuedDate = formattedDate;
          } else {
            updateFields.disabilityIssuedDate = null;
          }
        }

      } else {
        updateFields[key] = value; // For other fields, just add them as is
      }
    }


    // Ensure that there are fields to update
    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No updatable fields found",
      });
    }

    // Debugging to check the update result
    const updateResult = await MahadbtRenewal.update(updateFields, {
      where: { aadhar_number },
    });

    console.log("Update result:", updateResult);

    // Check if any rows were updated
    if (updateResult[0] === 0) {
      return res.status(400).json({
        success: false,
        message: "No rows were updated.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Data extracted and/or updated successfully.",
    });

  } catch (err) {
    console.error("Error in UPTA controller:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
/////////////////////////////////////////////////////////////////////////
//This one is for the mahadbt_renewal table
exports.UPTE = async (req, res) => {
  MahadbtRenewal.update(req.body, {
    // Specify the condition for the update
    where: {
      email: req.body.email,
    },
  })
    .then((result) => {
      console.log("result", result);
      console.log("email", req.body.email);

      // The result is an array where the first element is the number of updated rows
      return res.status(200).json({
        success: true,
        message: `${result[0]} row(s) updated`,
      });
    })
    .catch((error) => {
      console.error("Error updating records:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

/////////////////////////////////////////////////////////////////////////////////////////////////////
exports.getStudentDocInfoRenewal = async (req, res) => {
  try {
    const { aadhar_number, docType } = req.query;

    if (!aadhar_number || !docType) {
      return res.status(400).json({ message: "Aadhaar number and docType are required" });
    }

    const student = await MahadbtRenewal.findOne({ where: { aadhar_number } });

    if (!student) {
      return res.status(404).json({ message: "Student not found with provided Aadhaar" });
    }

    // Define the supported document fields
    const documentFields = {
      incomeDoc: ["annualIncome", "incomeCertNumber", "incomeIssuingAuthority", "incomeIssueDate"],
      casteDoc: ["casteCertificateNumber", "casteIssuedDistrict", "casteApplicantName", "casteIssAuthority", "casteIssuedDate", "subCaste","casteCategory"],
      domicileDoc: ["domicileCertNumber", "domicileApplicantName", "domicileIssuedAuthority", "domicileIssuedDate"],
      disabilityDoc: ["disabilityPercent", "disabilityCertNo", "disabilityIssAuthority", "disabilityIssuedDate", "name"],
      capAllotmentLetter: ["qualificationLevel", "courseName", "cetPercent", "admissionApplicationId", "instituteName", "instituteState","instituteDistrict","instituteTaluka","admissionCasteCateogary"],
      class10Doc: ["class10Board", "class10PassingYear", "class10Percentage", "class10SeatNumber", "class10MonthOfExam", "class10MarksObtained"],
      class12Doc: ["class12Stream", "class12Board", "class12SeatNumber", "class12PassingYear", "class12Percentage"],
      hostelDoc: ["hostelState", "hostelDistrict", "hostelTaluka", "hostelName", "hostelAddress", "hostelPincode", "hostelAdmissionDate", "hostelType"],
      disabilityDoc: ["disabilityType", "disabilityName", "disabilityCertificateNo", "disabilityPercentage", "disabilityIssuingAuthority", "disabilityIssuedDate"]
      // Add other document types and their respective fields here
    };

    if (!documentFields[docType]) {
      return res.status(400).json({ message: "Invalid docType provided" });
    }

    const responseData = {};
    documentFields[docType].forEach(field => {
      responseData[field] = student[field] || null;
    });

    console.log(`🟢 Extracted ${docType} Data:`, responseData);

    return res.status(200).json({
      message: `Extracted ${docType} data successfully`,
      data: responseData
    });

  } catch (err) {
    console.error("🔴 Error in getStudentDocInfo:", err.message, err.stack);
    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message
    });
  }
};


//UPTA update profile through aadhar

// exports.UPTA = async (req, res) => {
//   shravani_allcolumns.update(req.body, {
//     // Specify the condition for the update
//     where: {
//       aadhaar_number: req.body.aadhaar_number,
//     },
//   })
//     .then((result) => {
//       console.log("result", result);
//       console.log("aadhaar", req.body.aadhaar_number);

//       // The result is an array where the first element is the number of updated rows
//       return res.status(200).json({
//         success: true,
//         message: `${result[0]} row(s) updated`,
//       });
//     })
//     .catch((error) => {
//       console.error("Error updating records:", error);
//       res.status(500).json({ error: "Internal Server Error" });
//     });
// };      

/////////////////////////////////////////////////////////////////////////////////////////////////////

exports.createProfileBot = async (req, res) => {
  try {
    // Extract data from req.body or wherever your data comes from
    // const { aadhaar, name, aadhaar_link_mob_no, email } = req.body;
    const { aadhaar_number } = req.body;

    // Create a new record in the Mahadbtprofiles table
    const newProfile = await shravani_allcolumns.create({
      aadhaar_number: aadhaar_number
    });

    // Handle success
    return res.status(200).json({
      success: true,
      message: 'Profile created successfully',
      data: newProfile  // Optionally return the created record
    });
  } catch (error) {
    // Handle error
    console.error('Error creating profile:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal Server Error'
    });
  }
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.createProfileBotRenewal = async (req, res) => {
  try {
    const { email } = req.body;

    // Create a new record in the Mahadbtprofiles table
    const newProfile = await MahadbtRenewal.create({
      email: email
    });

    // Handle success
    return res.status(200).json({
      success: true,
      message: 'Profile created successfully',
      data: newProfile  // Optionally return the created record
    });
  } catch (error) {
    // Handle error
    console.error('Error creating profile:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal Server Error'
    });
  }
};



/////////////////////////////////////////////////////////////////////////////////////////////////////////

// Function to fetch records with blank values in specified columns using Aadhaar

// Function to fetch records by aadhaar
exports.fetchBlankRecordsByAadhaar = async (req, res) => {
  try {
    // Extract aadhaar from request parameters or body
    const { aadhaar } = req.body;

    // Find all records with the specified aadhaar
    const profiles = await mahadbtProfilesBot.findAll({
      where: {
        aadhaar_card: aadhaar,
      },
    });

    // Handle success
    return res.status(200).json({
      success: true,
      data: profiles,
    });
  } catch (error) {
    // Handle error
    console.error('Error fetching profiles:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal Server Error',
    });
  }
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// exports.editStudent = async (req, res) => {

//   console.log("name************", req.body);
//   console.log("name==========",req.body.namee);
//   mahadbtProfilesBot.update(req.body, {
// candidateName: namee,
// email: email,
// whatsappNumber: mobile,
// dob:dob,
// gender: gender,
// parentMobileNumber: parentMobile,
// maritalStatus: maritalStatus,
// religion: religion,
// casteCategory: casteCategory,
// subCaste: subCaste,
// doYouHaveCasteCertificate: casteCertificate,
// casteCertificateNumber: casteCertificateNumber,
// casteIssuedDistrict: issuingDistrict,
// casteApplicantName: casteApplicantName,
// casteIssuingAuthority: casteIssuingAuthority,
// annualFamilyIncome: familyIncome,
// doYouHaveIncomeCertificate: incomeCertificate,
// incomeCertNo: incomeCertificateNumber,
// incomeIssAuthority: incomeIssuingAuthority,
// doYouHaveDomicileMaharashtraKarnataka: domicileMaharashtra,
// doYouHaveDomicileCertificate: domicileCertificate,
// domicileRelationType: relationshipType,
// domicileCertNumber: domicileCertificateNumber,
// domicileApplicantName: domicileApplicantName,
// domicileIssuedAuthority: domicileIssuingAuthority,
// doYouHaveDisability: disability,
// disabilityType: disabilityType,
// disabilityName: personWithDisability,
// doYouHaveDisabilityCertificate: disabilityCertificate,
// disabilityCertificateNo: disabilityCertificateNumber,
// disabilityPercentage: disabilityPercentage,
// disabilityIssuedDate: disabilityIssuingDate,
// disabilityIssuingAuthority: disabilityIssuingAuthority,
// bankaccName: bankAccount,
// bankIfsc:bankIfsc,



//     // Specify the condition for the update
//     where: {
//       id: req.body.id,
//     },
//   })
//     .then((result) => {
//       console.log("request body**********", req.body);
//       console.log("result", result);
//       console.log("request body id", req.body.id);

//       // The result is an array where the first element is the number of updated rows
//       return res.status(200).json({
//         success: true,
//         message: `${result[0]} row(s) updated`,
//       });
//     })
//     .catch((error) => {
//       console.log("request body catch", req.body);
//       console.error("Error updating records:", error);
//       res.status(500).json({ error: "Internal Server Error" });
//     });
// };      

exports.editStudent = async (req, res) => {
  try {
    console.log("name************", req.body);
    const {
      id,
      namee,
      email,
      mobile,
      dob,
      gender,
      parentMobile,
      maritalStatus,
      religion,
      casteCategory,
      subCaste,
      casteCertificate,
      casteCertificateNumber,
      issuingDistrict,
      casteApplicantName,
      casteIssuingAuthority,
      familyIncome,
      incomeCertificate,
      incomeCertificateNumber,
      incomeIssuingAuthority,
      domicileMaharashtra,
      domicileCertificate,
      relationshipType,
      domicileCertificateNumber,
      domicileApplicantName,
      domicileIssuingAuthority,
      disability,
      disabilityType,
      personWithDisability,
      disabilityCertificate,
      disabilityCertificateNumber,
      disabilityPercentage,
      disabilityIssuingDate,
      disabilityIssuingAuthority,
      bankAccount,
      bankIfsc
    } = req.body;

    console.log("name==========", namee);

    const result = await mahadbtProfilesBot.update({
      candidateName: namee,
      email: email,
      whatsappNumber: mobile,
      dob: dob,
      gender: gender,
      parentMobileNumber: parentMobile,
      maritalStatus: maritalStatus,
      religion: religion,
      casteCategory: casteCategory,
      subCaste: subCaste,
      doYouHaveCasteCertificate: casteCertificate,
      casteCertificateNumber: casteCertificateNumber,
      casteIssuedDistrict: issuingDistrict,
      casteApplicantName: casteApplicantName,
      casteIssuingAuthority: casteIssuingAuthority,
      annualFamilyIncome: familyIncome,
      doYouHaveIncomeCertificate: incomeCertificate,
      incomeCertNo: incomeCertificateNumber,
      incomeIssAuthority: incomeIssuingAuthority,
      doYouHaveDomicileMaharashtraKarnataka: domicileMaharashtra,
      doYouHaveDomicileCertificate: domicileCertificate,
      domicileRelationType: relationshipType,
      domicileCertNumber: domicileCertificateNumber,
      domicileApplicantName: domicileApplicantName,
      domicileIssuedAuthority: domicileIssuingAuthority,
      doYouHaveDisability: disability,
      disabilityType: disabilityType,
      disabilityName: personWithDisability,
      doYouHaveDisabilityCertificate: disabilityCertificate,
      disabilityCertificateNo: disabilityCertificateNumber,
      disabilityPercentage: disabilityPercentage,
      disabilityIssuedDate: disabilityIssuingDate,
      disabilityIssuingAuthority: disabilityIssuingAuthority,
      bankaccName: bankAccount,
      bankIfsc: bankIfsc,
    }, {
      where: { id: id }
    });

    console.log("request body**********", req.body);
    console.log("result", result);
    console.log("request body id", req.body.id);

    return res.status(200).json({
      success: true,
      message: `${result[0]} row(s) updated`,
    });
  } catch (error) {
    console.log("request body catch", req.body);
    console.error("Error updating records:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

////////////////////////////////////////////////////////////////////


//fetchstud update profile through aadhar

// exports.fetchstud = async (req, res) => {
//   Mahadbtprofiles.findAll()
//     .then((result) => {
//       console.log("result", result);
//         // The result is an array where the first element is the number of updated rows
//       return res.status(200).json({
//         success: true,
//         message: `${result[0]} row(s) updated`,
//         data : result
//       });
//     })
//     .catch((error) => {
//       console.error("Error updating records:", error);
//       res.status(500).json({ error: "Internal Server Error" });
//     });
// };

exports.fetchstud = (req, res) => {
  Mahadbtprofiles
    .findAll({})
    .then((data) => {
      console.log('Data retrieved:', data);
      res.json({
        success: true,
        data,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "Failed to retrieve data from forstu_tranches",
        error: error.message || "An error occurred",
      });
    });
};


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.getallFresh = async (req, res) => {

  try {
    const freshprofiles = await mahadbtProfilesBot.findAll();
    return res.status(200).json(
      {
        sucess: true,
        data: freshprofiles
      }
    );

  } catch (error) {
    console.error("Error fetching profiles :", error);
    res.status(500).json({ error: "internal server Error" })

  }
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////
exports.getallRenewal = async (req, res) => {
  try {
    const renewalprofiles = await MahadbtRenewal.findAll();
    return res.status(200).json(
      {
        sucess: true,
        data: renewalprofiles
      }
    );
  } catch (error) {
    console.error("Error fetching profiles :", error);
    res.status(500).json({ error: "internal server Error" })

  }
}
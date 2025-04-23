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

    const documentFields = ["casteDoc", "incomeDoc", "domicileDoc", "capAllotmentLetter"];
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
          updateFields.incomeDoc = value;  // Save the image URL (value is the image URL)
          updateFields.annualFamilyIncome = extracted.annualFamilyIncome;
          updateFields.incomeCertNo = extracted.incomeCertNo;
          updateFields.incomeIssAuthority = extracted.incomeIssAuthority;
          if (extracted.incomeIssuedDate) {
            const formattedDate = moment(extracted.incomeIssuedDate, 'DD/MM/YYYY').format('YYYY-MM-DD');
            updateFields.incomeIssuedDate = formattedDate;
          } else {
            updateFields.incomeIssuedDate = null;
          }
        } else if (key === "casteDoc") {
          updateFields.casteDoc = value; // Save the image URL (value is the image URL)
          updateFields.casteCertificateNumber = extracted.casteCertificateNumber;
          updateFields.casteIssuedDistrict = extracted.casteIssuedDistrict;
          updateFields.casteApplicantName = extracted.casteApplicantName;
          updateFields.casteIssAuthority = extracted.casteIssAuthority;
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
          if (extracted.domicileIssuedDate) {
            const formattedDate = moment(extracted.domicileIssuedDate, 'DD/MM/YYYY').format('YYYY-MM-DD');
            updateFields.domicileIssuedDate = formattedDate;
          } else {
            updateFields.domicileIssuedDate = null;
          }
        } else if (key === "capAllotmentLetter") {
          updateFields.capAllotmentLetter = value; // Save the image URL (value is the image URL)
          updateFields.Name = extracted.Name;
          updateFields.InstituteName = extracted.InstituteName;
          updateFields.CourseName = extracted.CourseName;
          updateFields.DateOfAdmission = extracted.DateOfAdmission;
          updateFields.MeritNo = extracted.MeritNo;
          updateFields.SeatType = extracted.SeatType;
          updateFields.AdmissionLevel = extracted.AdmissionLevel;
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
      casteDoc: ["casteCertificateNumber","casteIssuedDistrict","casteApplicantName", "casteIssAuthority", "casteIssuedDate"],
      domicileDoc: ["DomicileCertificateNo", "DomicileApplicantName", "DomicileIssuingAuthority", "DomicileDateofIssue"],
      disabilityDoc: ["disabilityPercent", "disabilityCertNo", "disabilityIssAuthority", "disabilityIssuedDate", "name"]
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



/////////////////////////////////////////////////////////////////////////////////    
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
            aadhaar_number : aadhaar_number           
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
      email : email           
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
exports.fetchBlankRecordsByAadhaar  = async (req, res) => {
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

  try{
        const freshprofiles = await mahadbtProfilesBot.findAll();
        return res.status(200).json(
           {
            sucess: true,
            data : freshprofiles
           }
          );

  }catch (error) {
    console.error("Error fetching profiles :" , error);
    res.status(500).json({error: "internal server Error"})

  }
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////
exports.getallRenewal = async (req, res) => {
  try{
        const renewalprofiles = await MahadbtRenewal.findAll();
        return res.status(200).json(
          {
            sucess: true,
            data : renewalprofiles
          }
        );
  }catch (error){
    console.error("Error fetching profiles :", error);
    res.status(500).json({error:"internal server Error"})

  }
}
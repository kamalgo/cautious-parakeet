// this file is created to test the update query for mahadabt_profile table in DB 
//update the row data through email
//testing using POSTMAN

const { Sequelize, Op } = require("sequelize");
const Mahadbtprofiles = require("../models/mahadbtModel");
const mahadbtProfilesBot = require("../models/mahadbtModel_Bot");
const MahadbtRenewal = require("../models/mahadbtRenewalModel");
const shravani_allcolumns = require("../models/shravaniAllColumnsModel");

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
      //   Mahadbtprofiles.update(req.body, {
      //     // Specify the condition for the update
      //     where: {
      //       aadhaar: req.body.aadhaar,
      //     },
      //   })
      //     .then((result) => {
      //       console.log("result", result);
      //       console.log("aadhaar", req.body.aadhaar);
            
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

      exports.UPTA = async (req, res) => {
        shravani_allcolumns.update(req.body, {
          // Specify the condition for the update
          where: {
            aadhaar_number: req.body.aadhaar_number,
          },
        })
          .then((result) => {
            console.log("result", result);
            console.log("aadhaar", req.body.aadhaar_number);
            
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
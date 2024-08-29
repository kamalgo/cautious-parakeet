const { Sequelize, Op } = require("sequelize");
const forstu_tranches = require("../models/forstu_tranchesModel");
const ForstuCandidates = require("../models/forstu_candidatesModel");

///////////////////////////////////////////////////////////////////////////////////////////////////////////

//this function is used in SCTracker and Tranch Tracker College
// Function to get all tranches 
exports.getAllForstuTranches = (req, res) => {
    forstu_tranches
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

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// // Function to get students by ApplicationID
// exports.getStudentByApplicationId = (req, res) => {
//     const applicationId = req.params.ApplicationID;
//     console.log("Searching for ApplicationID:", applicationId);
//     forstu_tranches
//       .findAll({
//         where: {
//           ApplicationID: applicationId,
//         },
//       })
//       .then((students) => {
//         if (students.length === 0) {
//           return res.status(404).json({
//             success: false,
//             message: "No students found with the given ApplicationID",
//           });
//         }
  
//         res.json({
//           success: true,
//           data: students,
//         });
//       })
//       .catch((error) => {
//         res.status(500).json({
//           success: false,
//           message: "Failed to retrieve students by ApplicationID",
//           error: error.message || "An error occurred",
//         });
//       });
// };

// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.addTranchData = (req, res) => {
    const { name, status, tranchAmount, ApplicationID, tranch, creditDate, referenceId} = req.body;
    
    console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk",req.body);

    const errors = [];
  
    // Validate each field and collect error messages
    if (!name) errors.push("Name is required");
    if (!status) errors.push("Status is required");
    if (!tranchAmount) errors.push("Amount is required");
    if (!ApplicationID) errors.push("Application ID is required");
    if (!tranch) errors.push("Tranch is required");
    if (!creditDate) errors.push("Credited Date is required");
    if (!referenceId) errors.push("refID is required");

  
    // If there are any validation errors, return them
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors
      });
    }
  
    // Create a new tranch record
    forstu_tranches
      .create({
        Name: name, // Assuming Candidate_name maps to Name in your model
        Status: status,
        Amount: tranchAmount, // Assuming amount maps to Amount in your model
        ApplicationID,
        Tranch: tranch, // Assuming tranch maps to Tranch in your model
        Credited_Date: creditDate, // Assuming Credit_Date maps to Credited_Date in your model
        refID : referenceId
      })
      .then((newTranche) => {
        res.status(201).json({
          success: true,
          message: "Tranch data added successfully",
          data: newTranche,
        });
      })
      .catch((error) => {
        res.status(500).json({
          success: false,
          message: "Failed to add tranch data",
          error: error.message || "An error occurred",
        });
      });
  };

// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// // Function to get all tranches with tranches count
// exports.getForstuTranches = async (req, res) => {
//   try {
//       // Fetch all data from the database
//       const data = await forstu_tranches.findAll({});

//       // Calculate the tranches count
//       const tranchesCounts = await forstu_tranches.findAll({
//           attributes: [
//               'ApplicationID',
//               [Sequelize.fn('COUNT', Sequelize.col('ApplicationID')), 'tranchesCount']
//           ],
//           group: ['ApplicationID']
//       });

//       // Create a mapping of ApplicationID to tranchesCount
//       const tranchesCountMap = {};
//       tranchesCounts.forEach((entry) => {
//           tranchesCountMap[entry.ApplicationID] = entry.dataValues.tranchesCount;
//       });

//       // Append counts to the data
//       const uniqueData = [];
//       const seenApplicationIDs = new Set();

//       data.forEach(entry => {
//           if (!seenApplicationIDs.has(entry.ApplicationID)) {
//               entry.dataValues.Tranches = tranchesCountMap[entry.ApplicationID] || 0;
//               uniqueData.push(entry);
//               seenApplicationIDs.add(entry.ApplicationID);
//           }
//       });

//       // Respond with the enhanced data
//       res.json({
//           success: true,
//           data: uniqueData,
//       });
//   } catch (error) {
//       res.status(500).json({
//           success: false,
//           message: "Failed to retrieve data from forstu_tranches",
//           error: error.message || "An error occurred",
//       });
//   }
// };

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//this adds data in forstu_candidates
//fetches data from SCTracker section from website
exports.addCandidateData = (req, res) => {
  const { Name, ApplicationID, WhatsappNumber, ReferenceID } = req.body;

  console.log("Received candidate data:", req.body);

  const errors = [];

  // Validate each field and collect error messages
  if (!Name) errors.push("Name is required");
  if (!ApplicationID) errors.push("Application ID is required");
  if (!WhatsappNumber) errors.push("WhatsApp Number is required");
  if (!ReferenceID) errors.push("Reference ID is required")
  // If there are any validation errors, return them
  if (errors.length > 0) {
      return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: errors
      });
  }

  // Create a new candidate record
  ForstuCandidates.create({
      Name: Name, 
      ApplicationID: ApplicationID, 
      WhatsappNumber: WhatsappNumber,
      refID: ReferenceID
  })
  .then((newCandidate) => {
      res.status(201).json({
          success: true,
          message: "Candidate data added successfully",
          data: newCandidate,
      });
  })
  .catch((error) => {
      res.status(500).json({
          success: false,
          message: "Failed to add candidate data",
          error: error.message || "An error occurred",
      });
  });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Function to get the count of candidates by ApplicationID
exports.getCandidateCountByApplicationId = (req, res) => {
  const applicationId = req.params.ApplicationID;
  console.log("Counting candidates for ApplicationID:", applicationId);

  forstu_tranches
      .count({
          where: {
              ApplicationID: applicationId,
          },
      })
      .then((count) => {
          res.json({
              success: true,
              count,
          });
      })
      .catch((error) => {
          res.status(500).json({
              success: false,
              message: "Failed to retrieve candidate count by ApplicationID",
              error: error.message || "An error occurred",
          });
      });
};

///////////////////////////////////////////////////////////////////////////////////

// Function to get the count of all candidates
exports.getForstuTranchesCount = (req, res) => {
    forstu_tranches
        .count()
        .then((count) => {
            console.log('Count retrieved:', count);
            res.json({
                success: true,
                count,
            });
        })
        .catch((error) => {
            res.status(500).json({
                success: false,
                message: "Failed to count the data from forstu_candidates",
                error: error.message || "An error occurred",
            });
        });
};

/////////////////////////////////////////////////////////////////////////////////////
// Function to get the count of Tranch
exports.getForstuTranchOneCount = (req, res) => {
    forstu_tranches
        .count({ where: {Tranch: 1} }) // Count documents where tranch equals 1
        .then((count) => {
            console.log('Count retrieved:', count);
                res.json({
                    success: true,
                    count,
                    message: "Tranche 1 received count",
                });
        })
        .catch((error) => {
            res.status(500).json({
                success: false,
                message: "Failed to count the data from forstu_candidates",
                error: error.message || "An error occurred",
            });
        });
};

/////////////////////////////////////////////////////////////////////////////////////
// Function to get the count of Tranch
exports.getForstuTranchTwoCount = (req, res) => {
    forstu_tranches
        .count({ where: {Tranch: 2} }) // Count documents where tranch equals 1
        .then((count) => {
            console.log('Count retrieved:', count);
                res.json({
                    success: true,
                    count,
                    message: "Tranche 2 received count",
                });
        })
        .catch((error) => {
            res.status(500).json({
                success: false,
                message: "Failed to count the data from forstu_candidates",
                error: error.message || "An error occurred",
            });
        });
};

////////////////////////////////////////////////////////////////////////////////////////////

// Function to get the grand total of amount_receivable
exports.getTotalAmountReceived = (req, res) => {
    forstu_tranches
        .sum('Amount')
        .then((totalAmount) => {
            console.log('Total amount retrieved:', totalAmount);
            res.json({
                success: true,
                totalAmount,
            });
        })
        .catch((error) => {
            res.status(500).json({
                success: false,
                message: "Failed to retrieve the total amount from forstu_candidates",
                error: error.message || "An error occurred",
            });
        });
};
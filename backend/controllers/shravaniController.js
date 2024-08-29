const { Op } = require("sequelize");
const ROLES = require("../helpers/roles");
// const User = require("../models/usersModel");
const collegeprofile = require("../models/collegeModel");
const shravaniAllColumns = require("../models/shravaniAllColumnsModel");
const streamData = require("../models/streamModel");
const QualificationLevel = require("../models/qaulfification-levelModel");
const MahadbtCollegeStream = require("../models/mahadbtCollegeStreamModel");
const MahadbtCashSubscriptions = require("../../backend/models/mahadbtCashSubscriptionsModel"); // Assuming you have defined this model
 // Ensure you have the node-fetch package installed
// const fetch = require('node-fetch').default;

const { validationResult } = require("express-validator");
const { createHmac } = require("crypto");

const dotenv = require("dotenv");
dotenv.config();

exports.getShravaniallcolumns = (req, res) => {
    shravaniAllColumns
    .findAll({})
    .then((data) => {
      // console.log("your data req", data);
      data = JSON.stringify(data);
      data = JSON.parse(data);
      res.json({
        success: true,
        data,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "Failed to retrieve College Profile",
        error: error,
      });
    });
};

exports.getStudentByApplicationId = async (req, res) => {
  const applicationId = req.params.applicationId;

  try {
    // Fetch data from shravaniAllColumns table
    const students = await shravaniAllColumns.findAll({
      where: {
        First_ApplicationID: applicationId,
      },
    });

    if (students.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No students found with the given application ID",
      });
    }

    // Extract the name from the first student record
    const name = students[0].Beneficiary_Name; // Adjust the field name if different

    // Fetch data from MahadbtCashSubscriptions table
    const subscriptions = await MahadbtCashSubscriptions.findAll({
      where: {
        customerName: name, 
      },
    });

    // Combine the results
    const combinedData = {
      students,
      subscriptions,
    };

    res.json({
      success: true,
      data: combinedData,
    });
  } catch (error) {
    console.error("Error fetching data:", error); // Log the error for debugging
    res.status(500).json({
      success: false,
      message: "Failed to retrieve data",
      error: error.message || "An error occurred",
    });
  }
};



// In shravaniController.js

exports.chargeSubscription = async (req, res) => {
  const { subReferenceId, amount, scheduledOn, remarks, merchantTxnId } = req.body;

  try {
    // Validate required fields
    if (!amount || !scheduledOn || !remarks || !merchantTxnId || !subReferenceId) {
      return res.status(400).json({ success: false, message: 'Required fields are missing' });
    }

    // Construct the URL for the Cashfree API endpoint
    const apiUrl = `https://api.cashfree.com/api/v2/subscriptions/${subReferenceId}/charge`;

    // Set up options for the HTTPS request
    const options = {
      method: 'POST',
      headers: {
        'X-Client-Id': '849659e14e37d31f4c9b77cce56948', // Replace with your Cashfree client ID
        'X-Client-Secret': '81d6443ad709f11cbc2dc45b569e42251808321d', // Replace with your Cashfree client secret
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount,
        scheduledOn,
        remarks,
        merchantTxnId,
      }),
    };

    // Make the HTTPS request to charge the subscription
    const response = await fetch(apiUrl, options);

    // Check if the request was successful
    if (response.ok) {
      const responseData = await response.json();
      return res.status(200).json({ success: true, message: 'Subscription charged successfully', responseData });
    } else {
      // If request was not successful, send error status and message
      const errorData = await response.json();
      return res.status(response.status).json({ success: false, message: `Error charging subscription: ${errorData.message || response.statusText}` });
    }
  } catch (error) {
    console.error('Error charging subscription:', error);
    return res.status(500).json({ success: false, message: 'Failed to charge subscription', error: error.message });
  }
};


////////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.addStudent = (req, res) => {
  console.log("Received data:", req.body); // Log the received data

  const payments = req.body; // Assuming req.body is an array of payment entries

  // Iterate over each payment entry and insert it into the database
  Promise.all(
    payments.map(payment => 
      shravaniAllColumns.create({
        AccountNumber_AsPerBank: payment['Account Number'],
        Beneficiary_Name: payment['Beneficiary Name'],
        Amount: payment.Amount,
        Credit_Transaction_ID: payment['Transaction ID'],
        Credit_Date: payment['Credit Date'],
        Status: payment.Status,
        First_ApplicationID : payment['Application ID']
        // Add other fields as necessary
      })
    )
  )
  .then(() => {
    res.json({
      success: true,
      message: "Payments created successfully"
    });
  })
  .catch((error) => {
    console.error("Error adding payments:", error); // Log the error for debugging
    res.status(500).json({
      success: false,
      message: "Failed to execute insert query",
      error: error.message || "An error occurred",
    });
  });
};




//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// exports.addShravaniallcolumns = (req, res) => {
//   shravaniAllColumns
//   .create({
//     name: req.body.name,
//     email: req.body.email,
//     gender: req.body.gender,
//     mobile: req.body.mobile
// }).then(() => {
//     res.json({
//         status: true,
//         message: "Student created successfully"
//     });
// }).catch((error) => {
//     res.json({
//         status: false,
//         message: "Failed to execute insert query"
//     });
// });
// }



// exports.getStudentByApplicationId = (req, res) => {
//   const applicationId = req.params.applicationId;

//   shravaniAllColumns
//     .findAll({
//       where: {
//         First_ApplicationID: applicationId,
//       },
//     })
//     .then((students) => {
//       if (students.length > 0) {
//         // Execute the additional query
//         sequelize.query(`
//           SELECT 
//             mahadbt.cash_subscriptions.subReferenceId
//           FROM 
//             mahadbt.shravani_allcolumns
//           JOIN 
//             mahadbt.cash_subscriptions
//           ON 
//             mahadbt.shravani_allcolumns.Candidate_name = mahadbt.cash_subscriptions.customerName
//           AND 
//             mahadbt.shravani_allcolumns.whatsapp_number = mahadbt.cash_subscriptions.customerPhone
//           WHERE 
//             mahadbt.shravani_allcolumns.First_ApplicationID = :applicationId;
//         `, {
//           replacements: { applicationId: applicationId },
//           type: sequelize.QueryTypes.SELECT
//         })
//         .then((result) => {
//           res.json({
//             success: true,
//             students: students,
//             additionalData: result,
//           });
//         })
//         .catch((error) => {
//           res.status(500).json({
//             success: false,
//             message: "Failed to retrieve additional data",
//             error: error,
//           });
//         });
//       } else {
//         res.status(404).json({
//           success: false,
//           message: "No students found with the given application ID",
//         });
//       }
//     })
//     .catch((error) => {
//       console.error("Error retrieving student data:", error);
//       res.status(500).json({
//         success: false,
//         message: "Failed to retrieve student data",
//         error: error.message, // Return the error message
//       });
//     });
// };



// exports.getStudentByApplicationId = (req, res) => {
//   const applicationId = req.params.applicationId;


//   shravaniAllColumns
//     .findAll({
//       where: {
//         First_ApplicationID: applicationId,
//       },
//     })
//     .then((students) => {
//       if (students.length > 0) {
//         res.json({
//           success: true,
//           data: students,
//         });
//       } else {
//         res.status(404).json({
//           success: false,
//           message: "No students found with the given application ID",
//         });
//       }
//     })
//     .catch((error) => {
//       res.status(500).json({
//         success: false,
//         message: "Failed to retrieve student data",
//         error: error,
//       });
//     });
// };


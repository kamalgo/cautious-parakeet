// const express = require("express");
// const router = express.Router();
// const multer = require("multer");

// // Define multer configuration
// const upload = multer({
//     dest: "uploads/", // Destination folder for uploaded files
// });

// // Route to handle file upload
// router.post("/csv/upload", upload.single("csv"), (req, res) => {
//     try {
//         // Check if file was uploaded
//         if (!req.file) {
//             return res.status(400).json({ message: "No file uploaded" });
//         }

//         // Send success response
//         res.status(200).json({ message: "File uploaded successfully", filePath: req.file.path });
//     } catch (error) {
//         console.error("Error uploading file:", error);
//         res.status(500).json({ message: "An error occurred while uploading the file" });
//     }
//     // res.send('Hellooooooooooo')
// });

// module.exports = router;



const express = require("express");
const {handleUpload} = require("../controllers/uploadControllercsv")
// const { isSignedIn } = require("../controllers/authController");

const router = express.Router();

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });  // Set the destination folder

// router.post("/upload", uploadController.uploadFile);

router.post('/csvupload',upload.single('uploaded_file') ,handleUpload);


module.exports = router;




// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const fs = require("fs");
// const csv = require("csv-parser");
// const axios = require("axios");


// // Define multer configuration
// const upload = multer({
//     dest: "uploads/", // Destination folder for uploaded files
//   });
  
// // Route to create subscription using CSV
// router.post("/csv/create-subscription", upload.single("file"),
//     async (req, res) => {
//         try {
//             // Check if file was uploaded
//             if (!req.file) {
//                 return res.status(400).json({ message: "No file uploaded" });
//             }

//             // Parse the uploaded CSV file
//             fs.createReadStream(req.file.path)
//                 .pipe(csv())
//                 // Inside the data event handler
// .on("data", async (data) => {
//     try {
//         // Call the function to create subscription
//         const subscriptionResponse = await createSubscription(data);
//         console.log("Subscription Response:", subscriptionResponse);

//         // Check if subscription creation was successful
//         if (subscriptionResponse.status === 200 && subscriptionResponse.message === 'Subscription Created') {
//             // Get subscription details using the subReferenceId
//             const subReferenceId = subscriptionResponse.data.subReferenceId;
//             const subscriptionDetails = await getSubscriptionDetails(subReferenceId);
            
//             // Insert subscription details into the database
//             await insertSubscriptionDetails(subscriptionDetails);
//         } else {
//             console.error('Error creating subscription:', subscriptionResponse);
//             // Handle error for individual subscription creation
//         }
//     } catch (error) {
//         console.error("Error creating subscription:", error);
//         // Handle error for individual subscription creation
//     }
// })

//                 .on("end", () => {
//                     // Delete the uploaded file after processing
//                     fs.unlinkSync(req.file.path);

//                     // Send success response
//                     res
//                         .status(200)
//                         .json({ message: "Subscriptions created successfully" });
//                 });
//         } catch (error) {
//             console.error("Error processing CSV file:", error);
//             res
//                 .status(500)
//                 .json({ message: "An error occurred while processing the CSV file" });
//         }
//     }
// );

// async function createSubscription(formData) {
//     try {
//         // Here goes your implementation to create a subscription using the provided formData
//         // For example:
//         const apiUrl = 'https://api.cashfree.com/api/v2/subscriptions/nonSeamless/subscription';
//         const headers = {
//             'Content-Type': 'application/json',
//             'X-Client-Id': '849659e14e37d31f4c9b77cce56948',
//             'X-Client-Secret': '81d6443ad709f11cbc2dc45b569e42251808321d'
//         };
//         const response = await axios.post(apiUrl, formData, { headers });
//         return response.data;
//     } catch (error) {
//         throw error;
//     }
// }



// module.exports = router;

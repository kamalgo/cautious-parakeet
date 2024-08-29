const express = require("express");
const router = express.Router();
const multer = require("multer");

// exports.handleUpload = async () => {
    



//     if (!file) {
//       console.error("No file selected.");
//       return;
//     }
//     setButtonLoading(true);

//     const reader = new FileReader();
//     reader.onload = handleFileRead;
//     reader.readAsText(file);
//   };


exports.handleUpload = async () => {
    // const file = req.body.files;
    // console.log(req.files.foo); // the uploaded file object
    // if (!file) {
    //   console.error("No file selected.");
    //   return;
    // }
  
    // const reader = new FileReader();
  
    // reader.onload = () => {
    //   const csvData = reader.result;
    //   // Print CSV data to console
    //   console.log(csvData);
    //   // Alternatively, you can parse the CSV data and then print it
    //   // For example, if using PapaParse:
    //   const parsedData = Papa.parse(csvData, { header: true });
    //   console.log(parsedData);
    // };
  
    // reader.readAsText(file);
    // res.send("hello");
    res.send("Bhaiyajiiiiiii tesnion mat lo");
  };
// const express = require('express');
const dotenv = require("dotenv");
const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

dotenv.config();

// exports.submitjarController = (req, res) => {

//   console.log("your file", req.files.deepak)

//   if (!req.files || !req.files.deepak) {
//     return res.status(400).send("Please provide the JAR file.");
//   }

//   const jarFile = req.files.deepak;
//   // const jarFilePath = `${__dirname}/uploads/${jarFile.name}`;

//   const seleniumProcess = spawn('java', ['-jar', req.files.deepak]);
//   // const seleniumProcess = spawn('java', ['-jar', './files/example.jar']);

//   seleniumProcess.stdout.on('data', (data) => {
//     console.log(`Selenium Script Output: ${data}`);
//   });

//   seleniumProcess.stderr.on('data', (data) => {
//     console.error(`Selenium Script Error: ${data}`);
//   });

//   seleniumProcess.on('close', (code) => {
//     console.log(`Selenium Script exited with code ${code}`);
//     res.send(`Selenium Script exited with code ${code}`);
//   });

//   // res.send("Hello from jar controllerr");

//   // const  jarFilePath  = req.files.deepak;
//   // console.log("your file", req.files.deepak)

//   // if (!jarFilePath) {
//   //   return res.status(400).json({ error: 'Jar file path is required.' });
//   // }
//   // return
//   // const process = spawn('java', ['-jar', req.files.deepak]);

//   // let output = '';

//   // process.stdout.on('data', (data) => {
//   //   output += data.toString();
//   // });

//   // process.stderr.on('data', (data) => {
//   //   output += data.toString();
//   // });

//   // process.on('close', (code) => {
//   //   res.json({ code, output });
//   // });

//   // const jarFile = req.files.deepak;
//   // const jarFilePath = `${__dirname}/uploads/${jarFile.name}`;

//   // jarFile.mv(jarFilePath, (err) => {
//   //   if (err) {
//   //     return res.status(500).send(err);
//   //   }

//   //   const seleniumProcess = spawn('java', ['-jar', jarFilePath]);

//   // const jarFile = req.files.deepak;
//   // const uploadsDir = path.join(__dirname, 'uploads'); // Use path.join to create the directory path

//   // // Ensure the 'uploads' directory exists, create it if not
//   // if (!fs.existsSync(uploadsDir)) {
//   //   fs.mkdirSync(uploadsDir);
//   // }

//   // const jarFilePath = path.join(uploadsDir, jarFile.name);

//   // jarFile.mv(jarFilePath, (err) => {
//   //   if (err) {
//   //     return res.status(500).send(err);
//   //   }

//   //   seleniumProcess.stdout.on('data', (data) => {
//   //     console.log(`Selenium Script Output: ${data}`);
//   //   });

//   //   seleniumProcess.stderr.on('data', (data) => {
//   //     console.error(`Selenium Script Error: ${data}`);
//   //   });

//   //   seleniumProcess.on('close', (code) => {
//   //     console.log(`Selenium Script exited with code ${code}`);
//   //     res.send(`Selenium Script exited with code ${code}`);
//   //   });
//   // });

// };

// exports.submitjarController = (req, res) => {
//   // if (!req.files || !req.files.deepak) {
//   //   return res.status(400).send("Please provide the JAR file.");
//   // }

//   // const jarFile = req.files.deepak;
//   // console.log(jarFile);
//   console.log("DIRRRRRR:::", __dirname)
//   return
//   const jarFilePath = `${__dirname}/uploads/${jarFile.name}`;

//   jarFile.mv(jarFilePath, (err) => {
//     if (err) {
//       return res.status(500).send(err);
//     }

//     const seleniumProcess = spawn('java', ['-jar', jarFilePath]);

//     seleniumProcess.stdout.on('data', (data) => {
//       console.log(`Selenium Script Output: ${data}`);
//     });

//     seleniumProcess.stderr.on('data', (data) => {
//       console.error(`Selenium Script Error: ${data}`);
//     });

//     seleniumProcess.on('close', (code) => {
//       console.log(`Selenium Script exited with code ${code}`);
//       res.send(`Selenium Script exited with code ${code}`);
//     });
//   });
// };

exports.submitjarController = (req, res) => {
  // console.log("DIRIRIIRIRIRI:::", __dirname)
  console.log(
    "DIRIRIIRIRIRI:::",
    path.join(__dirname, "..", "uploads", "123-0.0.1-SNAPSHOT-shaded.jar")
  );


  // const seleniumProcess = spawn('java', [
  //   '-cp',
  //   path.join(__dirname, '..', 'uploads', '123-0.0.1-SNAPSHOT-shaded.jar') + ';' +
  //   path.join(__dirname, '..', 'uploads', 'dependency', '*'),
  //   'dbmanager.DBConnectionManager'
  // ]);

  // const seleniumProcess = spawn("java", [
  //   "-cp",
  //   path.join(__dirname, "..", "uploads", "123-0.0.1-SNAPSHOT-shaded.jar") +
  //     ";" +
  //     path.join(__dirname, "..", "uploads", "dependency", "*"),
  //   "dbmanager.DBConnectionManager",
  // ]);

  const classpath = [
    path.join(__dirname, "..", "uploads", "123-0.0.1-SNAPSHOT-shaded.jar"),
    path.join(__dirname, "..", "uploads", "dependency", "*"),
  ].join(process.platform === "win32" ? ";" : ":"); // Join paths with colon as separator

  const seleniumProcess = spawn("java", [
    "-cp",
    classpath,
    "dbmanager.Demo_Script",
  ]);

  // return res.send("workingggg!!!!")

  seleniumProcess.stdout.on("data", (data) => {
    console.log(`Selenium Script Output: ${data}`);
  });

  seleniumProcess.stderr.on("data", (data) => {
    console.error(`Selenium Script Error: ${data}`);
  });

  seleniumProcess
    .on("close", (code) => {
      console.log(`Selenium Script exited with code ${code}`);
      res.json({
        success: true,
        message: `Successfully Submited Scholarship Application.`,
      });
    })
    .on("error", (err) => {
      console.log("Failed to start subprocess.", err);
      res.json({
        success: false,
        message: `Failed to Submit Scholarship Application.`,
      });
    });
};

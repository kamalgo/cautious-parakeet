const express = require("express");

const uploadController = require("../controllers/uploadController");
// const uploadControllercsv = require("../controllers/uploadControllercsv");
// const executeStoredProcedure = require('./database/storedProcedures');

const router = express.Router();

router.post("/upload", uploadController.uploadFile);
// router.post("/upload-csv", uploadControllercsv); // Use uploadControllercsv as middleware function
router.get("/runtheprocedure", uploadController.runTheProcedure);
router.get("/createstoreprocedure", uploadController.createStoreProcedure);



module.exports = router;

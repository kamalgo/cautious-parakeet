const express = require("express");
const {
  submitjarController
} = require("../controllers/jarController");
const { isSignedIn } = require("../controllers/authController");

const router = express.Router();

// const multer = require('multer');
// const upload = multer({ dest: 'uploads/' });  // Set the destination folder

// router.post("/upload", uploadController.uploadFile);

router.post('/executejar', isSignedIn, submitjarController);


module.exports = router;

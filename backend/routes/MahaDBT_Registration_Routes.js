const express = require("express");
const router = express.Router();
const { mahadbt_Applicant_Name, mahadbt_Username,
    mahadbt_Password,
    mahadbt_Applicant_Email,
Email_OTP,
mahadbt_Applicant_mobile,
Mobile_OTP,
Adhar_Number,
Adhar_OTP
    } = require("../controllers/MahaDBT_Registration_Controller");

// Define the route for creating a new applicant
router.post("/mahadbt-applicant", mahadbt_Applicant_Name);
router.post("/mahadbt-username", mahadbt_Username);
router.post("/mahadbt-password", mahadbt_Password);
router.post("/mahadbt-email", mahadbt_Applicant_Email);
router.post("/email-otp", Email_OTP);
router.post("/mahadbt-mobile", mahadbt_Applicant_mobile);
router.post("/mobile-otp", Mobile_OTP);
router.post("/aadhaar-number", Adhar_Number);
router.post("/aadhaar-otp", Adhar_OTP);

module.exports = router;


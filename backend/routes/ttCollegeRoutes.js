//this route is used for Tranch Tracker College Section

const express = require("express");
const router = express.Router();  // Initialize router
 
const{getTtcollegeTranches, updatePaymentStatus, getStudentByApplicationId} = require("../controllers/ttcollegeController");

router.get("/ttcollege/tranches", getTtcollegeTranches);
// updatePaymentStatus
router.get("/studenttranches/:ApplicationID", getStudentByApplicationId);

router.put('/ttcollege/payment/:paymentId', updatePaymentStatus);


module.exports = router;



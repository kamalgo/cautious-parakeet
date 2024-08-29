const express = require("express");
const { getShravaniallcolumns, getStudentByApplicationId, chargeSubscription, addStudent } = require("../controllers/shravaniController");

const router = express.Router();  // Initialize router


router.get("/getShravaniallcolumns", getShravaniallcolumns);
router.get('/student/:applicationId', getStudentByApplicationId);
router.post('/charge-subscription', chargeSubscription);  // Add the new route
router.get("/getAllPaymentsApi", getShravaniallcolumns);
router.post("/uploadPfmsExcel", addStudent);




module.exports = router;


const express = require("express");
const router = express.Router();  // Initialize router
 
const{getForstuTranches, getStudentByApplicationId, addTranchData,
         getAllForstuTranches, addCandidateData, getCandidateCountByApplicationId,
         getForstuTranchesCount, getForstuTranchOneCount, getForstuTranchTwoCount, getTotalAmountReceived
      } = require("../controllers/forstuTranchesController");

router.get("/alltranches", getAllForstuTranches)
// router.get("/getstudentstranch", getForstuTranches);
// router.get("/studenttranches/:ApplicationID", getStudentByApplicationId);
router.post("/addtranch",addTranchData);
router.post("/addCandidate",addCandidateData);
router.get('/candidate-count/:ApplicationID', getCandidateCountByApplicationId);
router.get("/getForstuTranchesCount", getForstuTranchesCount);
router.get("/getForstuTranchOneCount", getForstuTranchOneCount);
router.get("/getForstuTranchTwoCount", getForstuTranchTwoCount);
router.get("/getTotalAmountReceived", getTotalAmountReceived);

module.exports = router;

const express = require("express");
const router = express.Router();  // Initialize router
 
const{getAllCandidates, getCandidatesCount, getTotalAmountReceivable} = require("../controllers/forstuCandidateController");

router.get("/getallcandidates", getAllCandidates);
router.get("/getCandidatesCount", getCandidatesCount);
// router.get("/getstudentstranch", getForstuTranches);
// router.get("/studenttranches/:ApplicationID", getStudentByApplicationId);
// router.post("/addtranch",addTranchData);
router.get("/getTotalAmountReceivable", getTotalAmountReceivable);


module.exports = router;

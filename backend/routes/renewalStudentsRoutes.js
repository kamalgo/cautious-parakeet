const express = require("express");
const router = express.Router();

const {appPending, appSubmitted, removeRemark, getRemarks, updateRemarks, fetchRefCode, invalidDoc, validDoc, markAsUnsuccessful, markAsSuccessful, updateSchemeDetails , updateHostelDetails, updateCurrentCourseDetails, incomeDetails, personalInfo, getAllRenewalStudentsForPageLoad, searchRenewalStudents , getallRenewalStudents, getRenewalStudentDetails, getSingleMahadbtRenewalProfile, updateMahadbtRenewalProfile
     , sendincomeDocS3Renewal, sendfeeReceiptS3Renewal, sendHostelCertToS3Renewal, sendalpabudharakCertS3Renewal,
     sendDeclarationCertToS3Renewal, sendRegisteredLabourCertToS3Renewal, sendStudentPanCardToS3Renewal,
     sendFatherPanCardToS3Renewal, sendFatherAadharCardToS3Renewal, sendCasteValidityToS3Renewal, sendAllotmentLetterToS3Renewal,
     sendLeavingCertToS3Renewal, sendRationCardToS3Renewal, sendPreviousYearMarksheetToS3Renewal,
     sendGapCertToS3Renewal
     } = require("../controllers/renewalStudentsController");



router.post("/appPending",appPending);
router.post("/appSubmitted",appSubmitted);

router.put("/removeRemark",removeRemark);
router.post("/getRemarks",getRemarks);
router.post("/updateRemarks", updateRemarks);
router.post("/fetchRefCode", fetchRefCode);

router.post("/validateDocument",validDoc);
router.post("/invalidateDocument",invalidDoc);


//MahaDBT Login Valid Invalid Section
router.post("/markAsSuccessful",markAsSuccessful);
router.post("/markAsUnsuccessful",markAsUnsuccessful);

//verified section 
router.post("/personalInfoVerified",personalInfo);
router.post("/incomeDetailsVerified",incomeDetails);
router.post("/currentCourseVerified",updateCurrentCourseDetails);
router.post("/hostelVerified",updateHostelDetails);
router.post("/schemeVerified",updateSchemeDetails);


router.post("/getallRenewalStudents",getAllRenewalStudentsForPageLoad);
router.post('/searchRenewalStudents', searchRenewalStudents);

router.get("/getRenewalStudentDetails/:id", getRenewalStudentDetails);
router.post("/getSingleMahadbtRenewalProfile", getSingleMahadbtRenewalProfile);
router.put("/updateMahadbtRenewalProfile", updateMahadbtRenewalProfile);
router.put("/sendincomeDocS3Renewal", sendincomeDocS3Renewal);
router.put("/sendfeeReceiptS3Renewal", sendfeeReceiptS3Renewal);
router.put("/sendHostelCertToS3Renewal", sendHostelCertToS3Renewal);
router.put("/sendalpabudharakCertS3Renewal", sendalpabudharakCertS3Renewal);
router.put("/sendDeclarationCertToS3Renewal", sendDeclarationCertToS3Renewal);
router.put("/sendRegisteredLabourCertToS3Renewal", sendRegisteredLabourCertToS3Renewal);
router.put("/sendStudentPanCardToS3Renewal", sendStudentPanCardToS3Renewal);
router.put("/sendFatherPanCardToS3Renewal", sendFatherPanCardToS3Renewal);
router.put("/sendFatherAadharCardToS3Renewal", sendFatherAadharCardToS3Renewal);
router.put("/sendCasteValidityToS3Renewal", sendCasteValidityToS3Renewal);
router.put("/sendAllotmentLetterToS3Renewal", sendAllotmentLetterToS3Renewal);
router.put("/sendLeavingCertToS3Renewal", sendLeavingCertToS3Renewal);
router.put("/sendRationCardToS3Renewal", sendRationCardToS3Renewal);
router.put("/sendPreviousYearMarksheetToS3Renewal", sendPreviousYearMarksheetToS3Renewal);
router.put("/sendGapCertToS3Renewal", sendGapCertToS3Renewal);


module.exports = router;

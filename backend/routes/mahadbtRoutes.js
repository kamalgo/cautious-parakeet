const express = require("express");

const{UPTE, UPTA, createProfileBot, fetchBlankRecordsByAadhaar, editStudent, fetchstud, getallFresh
      ,getallRenewal, createProfileBotRenewal
      } = require("../controllers/updateMahadbt_Profiles")

const {
  getAllMahadbtProfiles,
  findMahadbtProfCount,
  totalEligibleCount,
  totalSubmitCount,
  totalSubmitCountbyCaste,
  daySubmitCount,
  // weeklySubmitCount,
  MonthlySubmitCount,
  yearlySubmitCount,
  getCourseList,
  getCourseYear,
  totalCourseAndYear,
  testEmailController,
  getIncompleteFieldsController,
  sendDatatoDB,
  personalInfo,
  addressInfo,
  otherInfo,
  currentcourseInfo,
  pastQualificationInfo,
  hostelDetailsInfo,
  testEmailBulkController,
  sendOptToStudent,
  sendEmailToStudentWithMicrositeLink,
  verifyStudentByOtpAndEmail,
  getCourseYearsFromFrontend,
  getStatusCountbyCoursnameAndYear,
  getEmailsOfPendingStduents,
  getStudentsView,
  flushdata,
  getSingleMahadbtProfile,
  getSingleMahadbtProfileByRefCode,
  downloadCSVFileforApplicationStatus,
  downloadCSVFileforCasteWiseApplication,
  downloadCSVFileforPendingReason,
  downloadCSVFileOfUserList,
  downloadCSVFileOfCollegeList,
  downloadCSVFileforDailySubmittedApplication,
  downloadCSVFileforYearandCoursewisePendingApplicationList,
  test,
  sendCasteDocumentToS3,
  sendIncomeDocumentToS3,
  sendDomacileDocumentToS3,
  sendDisabilityDocumentToS3,
  sendGuardianDocumentToS3,
  sendAdmissionLetterDocumentToS3,
  sendBonafideOrFeesOrAdmissionReceiptDocumentToS3,
  send10thMarksheetDocumentToS3,
  send12thMarksheetDocumentToS3,
  sendGapDocumentToS3,
  sendHostelDocumentToS3,
  getPendingStudentsView,
  getSubmittedStudentsView,
  sendFeeReceiptToS3,sendHostelCertificateToS3, sendAlpabudharakCertificateToS3, sendLabourCertificateToS3, sendFamilyMemberBeneficiaryCertificateToS3,
  sendStudentPanCardToS3, sendFatherPanCardToS3,sendFatherAadhaarCardToS3, sendCasteValidityToS3, sendLeavingCertificateToS3,
  sendRationCardToS3, sendPreviousYearMarksheetToS3, sendFeeReceiptToS3Bot
} = require("../controllers/mahadbtController");


const {
  isSignedIn,
  isAdmin,
  isStudent,
  verifyToken,
} = require("../controllers/authController");

const router = express.Router();

router.get("/getListAllMahadbtprofiles", isSignedIn, getAllMahadbtProfiles);
router.get("/getProfileCount", isSignedIn, findMahadbtProfCount);
router.get("/getElgCount", isSignedIn, totalEligibleCount);
router.get("/totalSubCount", isSignedIn, totalSubmitCount);
router.get("/totalsubcountbycaste", isSignedIn, totalSubmitCountbyCaste);
router.get("/dailycount", isSignedIn, daySubmitCount);

router.get("/monthlycount", isSignedIn, MonthlySubmitCount);
router.get("/yearlycount", isSignedIn, yearlySubmitCount);

router.get("/getcourseslist", isSignedIn, getCourseList);
router.post("/getYearsFromCourse", isSignedIn, getCourseYearsFromFrontend);

router.post("/courseandyearwisedata", isSignedIn, totalCourseAndYear);

// done 1
router.post(
  "/downloadcsvforapplicationstatus",
  isSignedIn,
  downloadCSVFileforApplicationStatus
);

// done 2
router.post(
  "/downloadcsvforcastewiseapplicationstatus",
  isSignedIn,
  downloadCSVFileforCasteWiseApplication
);

// done 3
router.post(
  "/downloadcsvforpendingreason",
  isSignedIn,
  downloadCSVFileforPendingReason
);
// done 4
router.post("/downloadcsvforuserlist", isSignedIn, downloadCSVFileOfUserList);

// done 5
router.post(
  "/downloadcsvforcollegelist",
  isSignedIn,
  downloadCSVFileOfCollegeList
);

// done 6
router.post(
  "/downloadcsvforapplicationsubmittedasperdate",
  isSignedIn,
  downloadCSVFileforDailySubmittedApplication
);

// done 7
router.post(
  "/downloadcsvforyearandcoursewisependingapplication",
  isSignedIn,
  downloadCSVFileforYearandCoursewisePendingApplicationList
);

// router.post(
//   "/downloadcsvforcollegelist",
//   isSignedIn,
//   downloadCSVFileOfCollegeList
// );
// router.post(
//   "/downloadcsvforapplicationsubmittedasperdate",
//   isSignedIn,
//   downloadCSVFileforDailySubmittedApplication
// );

// router.post(
//   "/downloadcsvforapplicationstatus",
//   isSignedIn,
//   downloadCSVFileforApplicationStatus
// );

// router.post(
//   "/downloadcsvforcastewiseapplicationstatus",
//   isSignedIn,
//   downloadCSVFileforCasteWiseApplication
// );
// router.post(
//   "/downloadcsvforpendingreason",
//   isSignedIn,
//   downloadCSVFileforPendingReason
// );

router.post(
  "/applicationcountbycoursenameandyear",
  isSignedIn,
  getStatusCountbyCoursnameAndYear
);
router.post("/getIncompleteFields", getIncompleteFieldsController);

router.post(
  "/getEmailsofpendingstudents",
  isSignedIn,
  getEmailsOfPendingStduents
);
router.get("/getStudentsView", isSignedIn, getStudentsView);
router.get("/getpendingstudentsview", isSignedIn, getPendingStudentsView);
router.get("/getsubmittedstudentsview", isSignedIn, getSubmittedStudentsView);
router.delete("/flushdataofdb", flushdata);

// for microsite routes for students
router.put("/submitFormData", sendDatatoDB);

///////////////////////////////////////////////////////////////////////////////////////////////////
// API's for whatsapp chatbot
// router.put("/UPTE", isSignedIn, UPTE); // UPTE update profile through email
router.put("/UPTE", UPTE); // UPTE update profile through email
router.put("/UPTA", isSignedIn, UPTA); // UPTA update profile through email
router.post("/createProfileBot", createProfileBot); //creates a new profile record
router.post("/createProfileBotRenewal", createProfileBotRenewal);
router.get("/fetchBlankRecordsByAadhaar",isSignedIn, fetchBlankRecordsByAadhaar);
router.put("/editStudent", editStudent);
router.get("/fetchstud",fetchstud)
//////////////////////////////////////////////////////////////////////////////////////////////////

// ROutes for uploading Documents
// router.put("/submitcastedocument", sendCasteDocumentToS3);
router.put("/sendCasteDocumentToS3", sendCasteDocumentToS3);
router.put("/submitincomedocument", sendIncomeDocumentToS3);
router.put("/submitdomaciledocument", sendDomacileDocumentToS3);
router.put("/submitdisabilitydocument", sendDisabilityDocumentToS3);
router.put("/submitguardiandocument", sendGuardianDocumentToS3);
router.put("/submitadmissionletterdocument", sendAdmissionLetterDocumentToS3);
router.put(
  "/submitbonafideorfeesoradmissionreeceiptdocument",
  sendBonafideOrFeesOrAdmissionReceiptDocumentToS3
);
router.put("/submit10thmarksheetdocument", send10thMarksheetDocumentToS3);
router.put("/submit12thmarksheetdocument", send12thMarksheetDocumentToS3);
router.put("/submitgapdocument", sendGapDocumentToS3);
router.put("/submithosteldocument", sendHostelDocumentToS3);
router.put("/sendFeeReceiptToS3", sendFeeReceiptToS3);
router.put("/sendHostelCertificateToS3", sendHostelCertificateToS3);
router.put("/sendAlpabudharakCertificateToS3",sendAlpabudharakCertificateToS3);
router.put("/sendLabourCertificateToS3", sendLabourCertificateToS3 );
router.put("/sendFamilyMemberBeneficiaryCertificateToS3",sendFamilyMemberBeneficiaryCertificateToS3);
router.put("/sendStudentPanCardToS3", sendStudentPanCardToS3);
router.put("/sendFatherPanCardToS3", sendFatherPanCardToS3);
router.put("/sendFatherAadhaarCardToS3", sendFatherAadhaarCardToS3);
router.put("/sendCasteValidityToS3", sendCasteValidityToS3);
// router.put("sendLeavingCertificateToS3", sendLeavingCertificateToS3)
router.put("/sendLeavingCertificateToS3",sendLeavingCertificateToS3);
router.put("/sendRationCardToS3", sendRationCardToS3);
router.put("/sendPreviousYearMarksheetToS3", sendPreviousYearMarksheetToS3);
router.put("/sendFeeReceiptToS3Bot", sendFeeReceiptToS3Bot);

// router.put("/submi", sendIncomeDocumentToS3);

router.post("/getPersonalInfo", personalInfo);
router.post("/getAddressInfo", addressInfo);
router.post("/getOtherInfo", otherInfo);
router.post("/getcurrentcourseInfo", currentcourseInfo);
router.post("/getQualificationInfo", pastQualificationInfo);
router.post("/getHostelDetailsInfo", hostelDetailsInfo);

// router.post("/sendmailbulk", testEmailBulkController);
router.post(
  "/sendemailtostudentmicrosite",
  sendEmailToStudentWithMicrositeLink
);
router.post("/sendopttostudent", sendOptToStudent);

router.post("/verifystudent", verifyToken, verifyStudentByOtpAndEmail);

// router.post("/getprofileview", isSignedIn, getSingleMahadbtProfile);
router.post(
  "/studentprofileview",
  // isSignedIn,
  getSingleMahadbtProfileByRefCode
);

router.get("/getallFresh", getallFresh);
router.get("/getallRenewal",getallRenewal);


// send mail bulk mail to students

module.exports = router;

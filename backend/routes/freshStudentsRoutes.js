const express = require("express");
const router = express.Router();

const { getallFreshStudents, sendCasteDocumentToS3Fresh, getFreshStudentDetails, sendIncomeDocumentToS3Fresh,
    sendFeeReceiptToS3Fresh, sendhostelCertS3Fresh, sendalpabudharakCertS3Fresh,
    sendregisteredLabourCertS3Fresh, senddeclarationCertS3Fresh, sendstudentPanCardS3Fresh, sendfatherPanCardS3Fresh, 
    sendfatherAadharCardS3Fresh, sendCasteValidityS3Fresh
         }
     = require("../controllers/freshStudentsController");

router.get("/getallFreshStudents", getallFreshStudents);
router.get("/getFreshStudentDetails/:id", getFreshStudentDetails);

router.put("/sendCasteDocumentToS3Fresh", sendCasteDocumentToS3Fresh);
// router.put("/sendIncomeDocumentToS3Fresh", sendIncomeDocumentToS3Fresh);
router.put("/sendIncomeDocumentToS3Fresh", sendIncomeDocumentToS3Fresh);
router.put("/sendFeeReceiptToS3Fresh", sendFeeReceiptToS3Fresh);
router.put("/sendhostelCertS3Fresh", sendhostelCertS3Fresh);
router.put("/sendalpabudharakCertS3Fresh", sendalpabudharakCertS3Fresh);
router.put("/sendregisteredLabourCertS3Fresh", sendregisteredLabourCertS3Fresh);
router.put("/senddeclarationCertS3Fresh", senddeclarationCertS3Fresh);
router.put("/sendstudentPanCardS3Fresh", sendstudentPanCardS3Fresh);
router.put("/sendfatherPanCardS3Fresh", sendfatherPanCardS3Fresh);
router.put("/sendfatherAadharCardS3Fresh", sendfatherAadharCardS3Fresh);
router.put("/sendCasteValidityS3Fresh", sendCasteValidityS3Fresh);

module.exports = router;


// const express = require("express");
// const router = express.Router();

// const{getallFreshStudents} = require ("../controllers/freshStudentsController");

// router.get("/getallFreshStudents", getallFreshStudents);

// module.exports = router;

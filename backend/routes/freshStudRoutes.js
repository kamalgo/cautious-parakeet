const express = require("express");
const router = express.Router();

const {updateMahadbtFreshProfile, sendincomeDocS3Fresh, getFreshStudDetails, getAllFreshStudForPageLoad} = require("../controllers/freshStudController");


router.post("/getAllFreshStudForPageLoad", getAllFreshStudForPageLoad);
router.get("/getFreshStudDetails/:id", getFreshStudDetails);
router.put("/updateMahadbtFreshProfile", updateMahadbtFreshProfile);

//routes for documents upload 
router.put("/sendincomeDocS3Fresh", sendincomeDocS3Fresh);


module.exports = router;


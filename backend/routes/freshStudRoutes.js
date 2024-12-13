const express = require("express");
const router = express.Router();

const {sendincomeDocS3Fresh, getFreshStudDetails, getAllFreshStudForPageLoad} = require("../controllers/freshStudController");

router.post("/getAllFreshStudForPageLoad", getAllFreshStudForPageLoad);
router.get("/getFreshStudDetails/:id", getFreshStudDetails)

//routes for documents upload 
router.put("/sendincomeDocS3Fresh", sendincomeDocS3Fresh);


module.exports = router;


const express = require("express");
const router = express.Router();
const { getPresignedUrl } = require("../controllers/s3Controller");

router.get("/get-presigned-url", getPresignedUrl);

module.exports = router;

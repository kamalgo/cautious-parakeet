const express = require('express');
const router = express.Router();

const { generateAndUploadPDFS3 } = require('../controllers/generateAndUploadPDFS3');

router.post('/generate-pdf-s3', generateAndUploadPDFS3);

module.exports = router; // ✅ Always export your router

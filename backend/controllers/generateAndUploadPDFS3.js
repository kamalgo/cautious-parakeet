const { createPDF } = require("../../backend/pdf_generator/pdfGenerator");
const shravani_allcolumns = require('../models/shravaniAllColumnsModel');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const AWS = require('aws-sdk');
const { PDFDocument } = require('pdfkit'); // Make sure you're using pdfkit if required

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_BUCKET_REGION,
});

const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  region: process.env.AWS_BUCKET_REGION,
});

exports.generateAndUploadPDFS3 = async (req, res) => {
  try {
    const { aadhaar_number } = req.body;

    if (!aadhaar_number) {
      return res.status(400).json({ message: "Aadhaar number is required" });
    }

    // 1. Fetch student data
    const student = await shravani_allcolumns.findOne({ where: { aadhaar_number } });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // 2. Generate PDF Buffer (without saving to file)
    const pdfBuffer = await createPDF(student.dataValues); // Assuming createPDF now returns a buffer
    console.log('PDF Buffer:', pdfBuffer);  // Add this to verify buffer

    // 3. Upload to S3
    const pdfFileName = `${aadhaar_number}/generated_application.pdf`;
    const uploadParams = {
      Bucket: "mahadbtdocs",
      Key: pdfFileName,
      Body: pdfBuffer,
      ContentType: "application/pdf",
    };

    await s3.send(new PutObjectCommand(uploadParams));

    // 4. Construct public URL
    const objectUrl = `https://${uploadParams.Bucket}.s3.${AWS.config.region}.amazonaws.com/${uploadParams.Key}`;

    // 5. (Optional) Update database if you want to store PDF link
    await shravani_allcolumns.update(
      { generatedApplicationPdf: objectUrl }, 
      { where: { aadhaar_number } }
    );

    // 6. Send URL back in response
    res.status(200).json({
      success: true,
      message: "PDF uploaded successfully to S3",
      pdfUrl: objectUrl,
    });

  } catch (error) {
    console.error("Error while generating/uploading PDF: ", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

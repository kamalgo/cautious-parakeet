const { generatePresignedUploadURL } = require("../helpers/s3Presigned");

exports.getPresignedUrl = async (req, res) => {
  const { id, fileName, contentType, type = "incomedocument" } = req.query;

  if (!id || !fileName || !contentType) {
    return res.status(400).json({ error: "Missing query parameters" });
  }

  const key = `${id}/${type}/${fileName}`;

  try {
    const url = await generatePresignedUploadURL(key, contentType);
    return res.status(200).json({ url, key });
  } catch (error) {
    console.error("Error generating pre-signed URL:", error);
    return res.status(500).json({ error: "Failed to generate pre-signed URL" });
  }
};

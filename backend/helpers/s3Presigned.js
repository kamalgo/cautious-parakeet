const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const s3 = new S3Client({
  region: process.env.AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const generatePresignedUploadURL = async (key, contentType) => {
  const command = new PutObjectCommand({
    Bucket: "scanbotdemo",
    Key: key,
    ContentType: contentType,
  });

  const url = await getSignedUrl(s3, command, {
    expiresIn: 60 * 5, // 5 minutes
  });

  console.log('✅ Pre-Signed URL:', url);
console.log('📂 Key:', key);

  return url;
};

module.exports = { generatePresignedUploadURL };

const express = require("express");
const AWS = require("aws-sdk");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const s3 = new AWS.S3({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  signatureVersion: "v4",
});

app.post("/get-presigned-url", async (req, res) => {
  const { fileName, fileType } = req.body;

  const params = {
    Bucket: process.env.S3_BUCKET,
    Key: `pyqs/${Date.now()}-${fileName}`,
    ContentType: fileType,
    Expires: 60, // 1 minute
  };

  const uploadURL = await s3.getSignedUrlPromise("putObject", params);
  const fileUrl = `https://${process.env.S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`;

  res.json({ url: uploadURL, fileUrl });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`S3 Presigned URL server running at http://localhost:${PORT}`);
});

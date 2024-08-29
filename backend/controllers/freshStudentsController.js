const dummyModel = require("../models/dummyExcelModel");

  const { Sequelize, Op } = require("sequelize");
  const { createObjectCsvWriter } = require("csv-writer");
  const ROLES = require("../helpers/roles");
  const speakeasy = require("speakeasy");
  const { execFile } = require('child_process');

  const {
    S3Client,
    PutObjectCommand,
    GetObjectCommand,
    ListObjectsV2Command,
    DeleteObjectCommand,
    DeleteObjectsCommand,
  } = require("@aws-sdk/client-s3");
  // const User = require("../models/usersModel");
  const collegeprofile = require("../models/collegeModel");
  const Mahadbtprofiles = require("../models/mahadbtModel");

  const { validationResult } = require("express-validator");
  const { createHmac } = require("crypto");

  const dotenv = require("dotenv");
  const sequelize = require("../database/connection");
  const AWS = require("aws-sdk");
  const ExcelInfo = require("../models/testExcelModel");
  const User = require("../models/usersModel");
  const nodemailer = require("nodemailer");

  // const { Json } = require("sequelize/types/utils");
  dotenv.config();

  AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_BUCKET_REGION, // For example, 'us-east-1'
  });

  const s3 = new S3Client({
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY, // store it in .env file to keep it safe
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
    region: process.env.AWS_BUCKET_REGION, // this is the region that you select in AWS account
  });


exports.getallFreshStudents = async (req, res) => {
  const searchQuery = req.query.q || ""; // Get search query from request

  try {
    const freshprofiles = await dummyModel.findAll({
      where: {
        candidateName: {
          [Op.like]: `%${searchQuery}%`,
        },
      },
    });
    return res.status(200).json({
      success: true,
      data: freshprofiles,
    });
  } catch (error) {
    console.error("Error fetching profiles:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getFreshStudentDetails = async (req, res) => {
  const studentId = req.params.id;

  try {
    const student = await dummyModel.findByPk(studentId);

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    return res.status(200).json({
      success: true,
      data: student,
    });
  } catch (error) {
    console.error("Error fetching student details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.sendCasteDocumentToS3Fresh = async (req, res) => {
  // console.log("req blblblbl", req.body.id);
  // console.log("req profile", req);
  // Check if req.emailData exists and has the 'base32' property before accessing it
  // if (req?.emailData && req?.emailData?.base32) {
  //   // Access req.emailData.base32 safely
  //   console.log("Base32 value:", req.emailData.base32);
  // } else {
  //   console.log(
  //     "req.emailData is undefined or does not have 'base32' property."
  //   );
  // }

  // return res.send("success");
  // const dataOfMain = req.body;
  // console.log("req body id", req.body);
  // return;
  try {
    const file = req.files.file;
    const uploadParams = {
      Bucket: "mahadbtdocs",
      Key: `${req.body.id}/castedocument/${file.name}`,
      Body: file.data,
    };

    const listParams = {
      Bucket: "mahadbtdocs",
      Prefix: `${req.body.id}/castedocument/`,
    };

    // List all objects in the folder
    const listResponse = await s3.send(new ListObjectsV2Command(listParams));
    console.log("list response", listResponse);

    // Extract keys of objects in the folder
    const keys = listResponse?.Contents?.map((object) => ({ Key: object.Key }));
    console.log("keys", keys);

    if (keys?.length > 0) {
      // Create a command to delete the objects
      const deleteParams = {
        Bucket: "mahadbtdocs",
        Delete: {
          Objects: keys,
          Quiet: false, // Set to true to suppress successful delete responses
        },
      };
      // Send the delete command to S3
      const deleteResponse = await s3.send(
        new DeleteObjectsCommand(deleteParams)
      );
      console.log(
        "Objects in the folder deleted successfully:",
        deleteResponse.Deleted
      );
    }

    // return res.send("success");
    const data = s3.send(new PutObjectCommand(uploadParams));

    // Construct the URL of the uploaded object manually
    const objectUrl = `https://${uploadParams.Bucket}.s3.${AWS.config.region}.amazonaws.com/${uploadParams.Key}`;
       
    const updatedDataOfMain = {
      casteDoc: objectUrl,
    };
    console.log("updatedDataOfMain", updatedDataOfMain);
    // return res.status(200).json({
    //   success: true,
    //   message: "File uploaded to S3",
    //   data: objectUrl,
    // });
    // Update database entry
    await dummyModel.update(updatedDataOfMain, {
      where: {
        id: req.body.id,
      },
    });

    res.status(200).json({
      success: true,
      message: `${objectUrl} file(s) uploaded to S3 and database entry updated successfully.`,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.sendIncomeDocumentToS3Fresh = async (req, res) => {
  // console.log("req profile", req.files);
  // return res.send("success");
  // const dataOfMain = req.body;
  // console.log("req body id", req.body);
  // return;
  try {
    const file = req.files.file;
    const uploadParams = {
      Bucket: "mahadbtdocs",
      Key: `${req.body.id}/incomedocument/${file.name}`,
      Body: file.data,
    };

    const listParams = {
      Bucket: "mahadbtdocs",
      Prefix: `${req.body.id}/incomedocument/`,
    };

    // List all objects in the folder
    const listResponse = await s3.send(new ListObjectsV2Command(listParams));

    // Extract keys of objects in the folder
    const keys = listResponse?.Contents?.map((object) => ({ Key: object.Key }));

    console.log("Keeeee :", keys)

    if (keys?.length > 0) {
      // Create a command to delete the objects
      const deleteParams = {
        Bucket: "mahadbtdocs",
        Delete: {
          Objects: keys,
          Quiet: false, // Set to true to suppress successful delete responses
        },
      };
      // Send the delete command to S3
      const deleteResponse = await s3.send(
        new DeleteObjectsCommand(deleteParams)
      );
      console.log(
        "Objects in the folder deleted successfully:",
        deleteResponse.Deleted
      );
    }

    const data = s3.send(new PutObjectCommand(uploadParams));

    // Construct the URL of the uploaded object manually
    const objectUrl = `https://${uploadParams.Bucket}.s3.${AWS.config.region}.amazonaws.com/${uploadParams.Key}`;

    const updatedDataOfMain = {
      incomeDoc: objectUrl,
    };

    //python 

    
    console.log("updatedDataOfMain", updatedDataOfMain);
    // return res.status(200).json({
    //   success: true,
    //   message: "File uploaded to S3",
    //   data: objectUrl,
    // });
    // Update database entry
    await dummyModel.update(updatedDataOfMain, {
      where: {
        id: req.body.id,
      },
    });

    res.status(200).json({
      success: true,
      message: `${objectUrl} file(s) uploaded to S3 and database entry updated successfully.`,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
  //   res.status(200).json({
  //     success: true,
  //     message: "File uploaded to S3",
  //     data: objectUrl,
  //   });
  // } catch (error) {
  //   console.error("Error:", error);
  //   res.status(500).json({ error: "Internal Server Error" });
  // }
  // const uploadedObjectUrls = await Promise.all(s3UploadPromises);
};

exports.sendFeeReceiptToS3Fresh = async (req, res) => {
  try {
    const file = req.files.file;
    const uploadParams = {
      Bucket: "mahadbtdocs",
      Key: `${req.body.id}/feereceipt/${file.name}`,
      Body: file.data,
    };

    const listParams = {
      Bucket: "mahadbtdocs",
      Prefix: `${req.body.id}/feereceipt/`,
    };

    // List all objects in the folder
    const listResponse = await s3.send(new ListObjectsV2Command(listParams));

    // Extract keys of objects in the folder
    const keys = listResponse?.Contents?.map((object) => ({ Key: object.Key }));

    if (keys?.length > 0) {
      // Create a command to delete the objects
      const deleteParams = {
        Bucket: "mahadbtdocs",
        Delete: {
          Objects: keys,
          Quiet: false, // Set to true to suppress successful delete responses
        },
      };
      // Send the delete command to S3
      const deleteResponse = await s3.send(new DeleteObjectsCommand(deleteParams));
      console.log("Objects in the folder deleted successfully:", deleteResponse.Deleted);
    }

    const data = await s3.send(new PutObjectCommand(uploadParams));

    // Construct the URL of the uploaded object manually
    const objectUrl = `https://${uploadParams.Bucket}.s3.${AWS.config.region}.amazonaws.com/${uploadParams.Key}`;

    const updatedDataOfMain = {
      feeReceiptDoc: objectUrl,
    };
    console.log("updatedDataOfMain", updatedDataOfMain);

    // Update database entry
    await dummyModel.update(updatedDataOfMain, {
      where: {
        id: req.body.id,
      },
    });

    res.status(200).json({
      success: true,
      message: `${objectUrl} file(s) uploaded to S3 and database entry updated successfully.`,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.sendhostelCertS3Fresh = async (req, res) => {
  try {
    const file = req.files.file;
    const uploadParams = {
      Bucket: "mahadbtdocs",
      Key: `${req.body.id}/hostelcertificate/${file.name}`,
      Body: file.data,
    };

    const listParams = {
      Bucket: "mahadbtdocs",
      Prefix: `${req.body.id}/hostelcertificate/`,
    };

    // List all objects in the folder
    const listResponse = await s3.send(new ListObjectsV2Command(listParams));

    // Extract keys of objects in the folder
    const keys = listResponse?.Contents?.map((object) => ({ Key: object.Key }));

    if (keys?.length > 0) {
      // Create a command to delete the objects
      const deleteParams = {
        Bucket: "mahadbtdocs",
        Delete: {
          Objects: keys,
          Quiet: false, // Set to true to suppress successful delete responses
        },
      };
      // Send the delete command to S3
      const deleteResponse = await s3.send(
        new DeleteObjectsCommand(deleteParams)
      );
      console.log(
        "Objects in the folder deleted successfully:",
        deleteResponse.Deleted
      );
    }

    const data = s3.send(new PutObjectCommand(uploadParams));

    // Construct the URL of the uploaded object manually
    const objectUrl = `https://${uploadParams.Bucket}.s3.${AWS.config.region}.amazonaws.com/${uploadParams.Key}`;

    const updatedDataOfMain = {
      hostelDoc: objectUrl,
    };
    console.log("updatedDataOfMain", updatedDataOfMain);

    // Update database entry
    await dummyModel.update(updatedDataOfMain, {
      where: {
        id: req.body.id,
      },
    });

    res.status(200).json({
      success: true,
      message: `${objectUrl} file(s) uploaded to S3 and database entry updated successfully.`,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.sendalpabudharakCertS3Fresh = async (req, res) => {
  try {
    const file = req.files.file;
    const uploadParams = {
      Bucket: "mahadbtdocs",
      Key: `${req.body.id}/alpabudharakcertificate/${file.name}`,
      Body: file.data,
    };

    const listParams = {
      Bucket: "mahadbtdocs",
      Prefix: `${req.body.id}/alpabudharakcertificate/`,
    };

    // List all objects in the folder
    const listResponse = await s3.send(new ListObjectsV2Command(listParams));

    // Extract keys of objects in the folder
    const keys = listResponse?.Contents?.map((object) => ({ Key: object.Key }));

    if (keys?.length > 0) {
      // Create a command to delete the objects
      const deleteParams = {
        Bucket: "mahadbtdocs",
        Delete: {
          Objects: keys,
          Quiet: false, // Set to true to suppress successful delete responses
        },
      };
      // Send the delete command to S3
      const deleteResponse = await s3.send(
        new DeleteObjectsCommand(deleteParams)
      );
      console.log(
        "Objects in the folder deleted successfully:",
        deleteResponse.Deleted
      );
    }

    const data = s3.send(new PutObjectCommand(uploadParams));

    // Construct the URL of the uploaded object manually
    const objectUrl = `https://${uploadParams.Bucket}.s3.${AWS.config.region}.amazonaws.com/${uploadParams.Key}`;

    const updatedDataOfMain = {
      alpabhudharakDoc: objectUrl,
    };
    console.log("updatedDataOfMain", updatedDataOfMain);

    // Update database entry
    await dummyModel.update(updatedDataOfMain, {
      where: {
        id: req.body.id,
      },
    });

    res.status(200).json({
      success: true,
      message: `${objectUrl} file(s) uploaded to S3 and database entry updated successfully.`,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.sendregisteredLabourCertS3Fresh = async (req, res) => {
  try {
    const file = req.files.file;
    const uploadParams = {
      Bucket: "mahadbtdocs",
      Key: `${req.body.id}/labourcertificate/${file.name}`,
      Body: file.data,
    };

    const listParams = {
      Bucket: "mahadbtdocs",
      Prefix: `${req.body.id}/labourcertificate/`,
    };

    // List all objects in the folder
    const listResponse = await s3.send(new ListObjectsV2Command(listParams));

    // Extract keys of objects in the folder
    const keys = listResponse?.Contents?.map((object) => ({ Key: object.Key }));

    if (keys?.length > 0) {
      // Create a command to delete the objects
      const deleteParams = {
        Bucket: "mahadbtdocs",
        Delete: {
          Objects: keys,
          Quiet: false, // Set to true to suppress successful delete responses
        },
      };
      // Send the delete command to S3
      const deleteResponse = await s3.send(
        new DeleteObjectsCommand(deleteParams)
      );
      console.log(
        "Objects in the folder deleted successfully:",
        deleteResponse.Deleted
      );
    }

    const data = s3.send(new PutObjectCommand(uploadParams));

    // Construct the URL of the uploaded object manually
    const objectUrl = `https://${uploadParams.Bucket}.s3.${AWS.config.region}.amazonaws.com/${uploadParams.Key}`;

    const updatedDataOfMain = {
      labourDoc: objectUrl,
    };
    console.log("updatedDataOfMain", updatedDataOfMain);

    // Update database entry
    await dummyModel.update(updatedDataOfMain, {
      where: {
        id: req.body.id,
      },
    });

    res.status(200).json({
      success: true,
      message: `${objectUrl} file(s) uploaded to S3 and database entry updated successfully.`,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


exports.senddeclarationCertS3Fresh = async (req, res) => {
  try {
    const file = req.files.file;
    const uploadParams = {
      Bucket: "mahadbtdocs",
      Key: `${req.body.id}/familymemberbeneficiarycertificate/${file.name}`,
      Body: file.data,
    };

    const listParams = {
      Bucket: "mahadbtdocs",
      Prefix: `${req.body.id}/familymemberbeneficiarycertificate/`,
    };

    // List all objects in the folder
    const listResponse = await s3.send(new ListObjectsV2Command(listParams));

    // Extract keys of objects in the folder
    const keys = listResponse?.Contents?.map((object) => ({ Key: object.Key }));

    if (keys?.length > 0) {
      // Create a command to delete the objects
      const deleteParams = {
        Bucket: "mahadbtdocs",
        Delete: {
          Objects: keys,
          Quiet: false, // Set to true to suppress successful delete responses
        },
      };
      // Send the delete command to S3
      const deleteResponse = await s3.send(
        new DeleteObjectsCommand(deleteParams)
      );
      console.log(
        "Objects in the folder deleted successfully:",
        deleteResponse.Deleted
      );
    }

    const data = s3.send(new PutObjectCommand(uploadParams));

    // Construct the URL of the uploaded object manually
    const objectUrl = `https://${uploadParams.Bucket}.s3.${AWS.config.region}.amazonaws.com/${uploadParams.Key}`;

    const updatedDataOfMain = {
      declarationCertificateDoc: objectUrl,
    };
    console.log("updatedDataOfMain", updatedDataOfMain);

    // Update database entry
    await dummyModel.update(updatedDataOfMain, {
      where: {
        id: req.body.id,
      },
    });

    res.status(200).json({
      success: true,
      message: `${objectUrl} file(s) uploaded to S3 and database entry updated successfully.`,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


exports.sendstudentPanCardS3Fresh = async (req, res) => {
  try {
    const file = req.files.file;
    const uploadParams = {
      Bucket: "mahadbtdocs",
      Key: `${req.body.id}/studentpancard/${file.name}`,
      Body: file.data,
    };

    const listParams = {
      Bucket: "mahadbtdocs",
      Prefix: `${req.body.id}/studentpancard/`,
    };

    // List all objects in the folder
    const listResponse = await s3.send(new ListObjectsV2Command(listParams));

    // Extract keys of objects in the folder
    const keys = listResponse?.Contents?.map((object) => ({ Key: object.Key }));

    if (keys?.length > 0) {
      // Create a command to delete the objects
      const deleteParams = {
        Bucket: "mahadbtdocs",
        Delete: {
          Objects: keys,
          Quiet: false, // Set to true to suppress successful delete responses
        },
      };
      // Send the delete command to S3
      const deleteResponse = await s3.send(
        new DeleteObjectsCommand(deleteParams)
      );
      console.log(
        "Objects in the folder deleted successfully:",
        deleteResponse.Deleted
      );
    }

    const data = await s3.send(new PutObjectCommand(uploadParams));

    // Construct the URL of the uploaded object manually
    const objectUrl = `https://${uploadParams.Bucket}.s3.${process.env.AWS.config.region}.amazonaws.com/${uploadParams.Key}`;

    const updatedDataOfMain = {
      studentPanCard: objectUrl,
    };
    console.log("updatedDataOfMain", updatedDataOfMain);

    // Update database entry
    await dummyModel.update(updatedDataOfMain, {
      where: {
        id: req.body.id,
      },
    });

    res.status(200).json({
      success: true,
      message: `${objectUrl} file(s) uploaded to S3 and database entry updated successfully.`,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.sendfatherPanCardS3Fresh = async (req, res) => {
  try {
    const file = req.files.file;
    const uploadParams = {
      Bucket: "mahadbtdocs",
      Key: `${req.body.id}/fatherpancard/${file.name}`,
      Body: file.data,
    };

    const listParams = {
      Bucket: "mahadbtdocs",
      Prefix: `${req.body.id}/fatherpancard/`,
    };

    // List all objects in the folder
    const listResponse = await s3.send(new ListObjectsV2Command(listParams));

    // Extract keys of objects in the folder
    const keys = listResponse?.Contents?.map((object) => ({ Key: object.Key }));

    if (keys?.length > 0) {
      // Create a command to delete the objects
      const deleteParams = {
        Bucket: "mahadbtdocs",
        Delete: {
          Objects: keys,
          Quiet: false, // Set to true to suppress successful delete responses
        },
      };
      // Send the delete command to S3
      const deleteResponse = await s3.send(
        new DeleteObjectsCommand(deleteParams)
      );
      console.log(
        "Objects in the folder deleted successfully:",
        deleteResponse.Deleted
      );
    }

    const data = await s3.send(new PutObjectCommand(uploadParams));

    // Construct the URL of the uploaded object manually
    const objectUrl = `https://${uploadParams.Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${uploadParams.Key}`;

    const updatedDataOfMain = {
      fatherPanCard: objectUrl,
    };
    console.log("updatedDataOfMain", updatedDataOfMain);

    // Update database entry
    await dummyModel.update(updatedDataOfMain, {
      where: {
        id: req.body.id,
      },
    });

    res.status(200).json({
      success: true,
      message: `${objectUrl} file(s) uploaded to S3 and database entry updated successfully.`,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.sendfatherAadharCardS3Fresh = async (req, res) => {
  try {
    const file = req.files.file;
    const uploadParams = {
      Bucket: "mahadbtdocs",
      Key: `${req.body.id}/fatheraadhaarcard/${file.name}`,
      Body: file.data,
    };

    const listParams = {
      Bucket: "mahadbtdocs",
      Prefix: `${req.body.id}/fatheraadhaarcard/`,
    };

    // List all objects in the folder
    const listResponse = await s3.send(new ListObjectsV2Command(listParams));

    // Extract keys of objects in the folder
    const keys = listResponse?.Contents?.map((object) => ({ Key: object.Key }));

    if (keys?.length > 0) {
      // Create a command to delete the objects
      const deleteParams = {
        Bucket: "mahadbtdocs",
        Delete: {
          Objects: keys,
          Quiet: false, // Set to true to suppress successful delete responses
        },
      };
      // Send the delete command to S3
      const deleteResponse = await s3.send(
        new DeleteObjectsCommand(deleteParams)
      );
      console.log(
        "Objects in the folder deleted successfully:",
        deleteResponse.Deleted
      );
    }

    const data = await s3.send(new PutObjectCommand(uploadParams));

    // Construct the URL of the uploaded object manually
    const objectUrl = `https://${uploadParams.Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${uploadParams.Key}`;

    const updatedDataOfMain = {
      fatherAadhaarCard: objectUrl,
    };
    console.log("updatedDataOfMain", updatedDataOfMain);

    // Update database entry
    await dummyModel.update(updatedDataOfMain, {
      where: {
        id: req.body.id,
      },
    });

    res.status(200).json({
      success: true,
      message: `${objectUrl} file(s) uploaded to S3 and database entry updated successfully.`,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


exports.sendCasteValidityS3Fresh = async (req, res) => {
  try {
    const file = req.files.file;
    const uploadParams = {
      Bucket: "mahadbtdocs",
      Key: `${req.body.id}/castevalidity/${file.name}`,
      Body: file.data,
    };

    const listParams = {
      Bucket: "mahadbtdocs",
      Prefix: `${req.body.id}/castevalidity/`,
    };
    console.log("AWS_REGION:", process.env.AWS_REGION);


    // List all objects in the folder
    const listResponse = await s3.send(new ListObjectsV2Command(listParams));

    // Extract keys of objects in the folder
    const keys = listResponse?.Contents?.map((object) => ({ Key: object.Key }));

    if (keys?.length > 0) {
      // Create a command to delete the objects
      const deleteParams = {
        Bucket: "mahadbtdocs",
        Delete: {
          Objects: keys,
          Quiet: false, // Set to true to suppress successful delete responses
        },
      };
      // Send the delete command to S3
      const deleteResponse = await s3.send(
        new DeleteObjectsCommand(deleteParams)
      );
      console.log(
        "Objects in the folder deleted successfully:",
        deleteResponse.Deleted
      );
    }

    const data = await s3.send(new PutObjectCommand(uploadParams));

    // Construct the URL of the uploaded object manually
    const objectUrl = `https://${uploadParams.Bucket}.s3.${process.env.AWS.config.region}.amazonaws.com/${uploadParams.Key}`;

    const updatedDataOfMain = {
      casteValidityDoc: objectUrl,
    };
    console.log("updatedDataOfMain", updatedDataOfMain);

    // Update database entry
    await dummyModel.update(updatedDataOfMain, {
      where: {
        id: req.body.id,
      },
    });

    res.status(200).json({
      success: true,
      message: `${objectUrl} file(s) uploaded to S3 and database entry updated successfully.`,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

 

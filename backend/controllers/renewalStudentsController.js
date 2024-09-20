  
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
  const MahadbtRenwalprofiles = require("../models/mahadbtRenewalModel")
  const UserTable = require("../models/usersModel")

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


  exports.updateMahadbtRenewalProfile = (req, res) => {
    const { id } = req.body;
    const updatedData = req.body; // Assuming the updated data is in the request body
  
    MahadbtRenwalprofiles.update(updatedData, {
      where: {
        id: id,
      },
    })
      .then((num) => {
        if (num == 1) {
          res.json({
            success: true,
            message: "Mahadbt Renewal Profile was updated successfully.",
          });
        } else {
          res.json({
            success: false,
            message: `Cannot update Mahadbt Renewal Profile with id=${id}. Maybe the profile was not found or req.body is empty!`,
          });
        }
      })
      .catch((error) => {
        res.status(500).json({
          success: false,
          message: `Error updating Mahadbt Renewal Profile with id=${id}`,
          error: error,
        });
      });
  };
  
  exports.getSingleMahadbtRenewalProfile = (req, res) => {
    // console.log("id:::::", req.body);
    // console.log("clicked on single profile");
    // res.json({
    //   success: true,
    // });
    // return;
  
    // console.log("uour email", req.profile.email);
    // console.log("hellvgrtvr");
    // res.send("dddddddd");
    MahadbtRenwalprofiles.findOne({
      where: {
        // ref_code: req.profile.ref_code,
        // email: req.profile.email,
        id: req.body.id,
      },
    })
      .then((data) => {
        data = JSON.stringify(data);
        data = JSON.parse(data);
        res.json({
          success: true,
          data,
        });
      })
      .catch((error) => {
        res.status(500).json({
          success: false,
          message: "Failed to retrieve Mahadbt Profiles",
          error: error,
        });
      });
  };

// exports.getallRenewalStudents = async (req, res) => {
//   const searchQuery = req.query.q || ""; // Get search query from request

//   try {
//     const freshprofiles = await MahadbtRenwalprofiles.findAll({
//       where: {
//         candidateName: {
//           [Op.like]: `%${searchQuery}%`,
//         },
//       },
//     });
//     return res.status(200).json({
//       success: true,
//       data: freshprofiles,
//     });
//   } catch (error) {
//     console.error("Error fetching profiles:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// exports.getallRenewalStudents = async (req, res) => {
//   const searchQuery = req.query.q || ""; // Get search query from request
//   const referenceId = req.body.referenceId; // Get referenceId from request (optional)

//   try {
//     // Create a dynamic where clause based on searchQuery and optional referenceId
//     const whereClause = {
//       candidateName: {
//         [Op.like]: `%${searchQuery}%`,
//       },
//     };

//     // If referenceId is provided, add it to the where clause
//     if (referenceId) {
//       whereClause.referenceId = referenceId;
//     }

//     const renewalProfiles = await MahadbtRenwalprofiles.findAll({
//       where: whereClause,
//     });

//     return res.status(200).json({
//       success: true,
//       data: renewalProfiles,
//     });
//   } catch (error) {
//     console.error("Error fetching profiles:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// exports.getAllRenewalStudentsForPageLoad = async (req, res) => {
//   const referenceId = req.body.referenceId; // Get referenceId from request

//   try {
//     let whereClause = {}; // Initialize an empty where clause

//     // If referenceId is provided, add it to the where clause
//     if (referenceId) {
//       whereClause.referenceId = referenceId;
//     }

//     // Fetch profiles based on the where clause
//     const renewalProfiles = await MahadbtRenwalprofiles.findAll({
//       where: whereClause,
//     });

//     return res.status(200).json({
//       success: true,
//       data: renewalProfiles,
//     });
//   } catch (error) {
//     console.error("Error fetching profiles:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };


exports.getAllRenewalStudentsForPageLoad = async (req, res) => {
  const referenceId = req.body.referenceId; // Get referenceId from request

  try {
    let whereClause = {}; // Initialize an empty where clause

    // If referenceId is provided and it's not 'FORSTU', add it to the where clause
    if (referenceId && referenceId !== 'FORSTU') {
      whereClause.referenceId = referenceId;
    }

    // Fetch profiles based on the where clause
    const renewalProfiles = await MahadbtRenwalprofiles.findAll({
      where: whereClause,
    });

    return res.status(200).json({
      success: true,
      data: renewalProfiles,
    });
  } catch (error) {
    console.error("Error fetching profiles:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};





// exports.searchRenewalStudents = async (req, res) => {
//   const searchQuery = req.body.query || ""; // Get search query from request
//   const referenceId = req.body.referenceId; // Get referenceId from request (optional)

//   console.log("Received query:", searchQuery);
//   console.log("Received referenceId:", referenceId);

//   try {
//     // Create a dynamic where clause based on searchQuery
//     const whereClause = {
//       candidateName: {
//         [Op.like]: `%${searchQuery}%`,
//       },
//     };

//     // If referenceId is provided, add it to the where clause
//     if (referenceId) {
//       whereClause.referenceId = referenceId;
//     }

//     const renewalProfiles = await MahadbtRenwalprofiles.findAll({
//       where: whereClause,
//     });

//     return res.status(200).json({
//       success: true,
//       data: renewalProfiles,
//     });
//   } catch (error) {
//     console.error("Error fetching profiles:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };


exports.searchRenewalStudents = async (req, res) => {
  const searchQuery = req.body.query || ""; // Get search query from request
  const referenceId = req.body.referenceId; // Get referenceId from request (optional)

  console.log("Received query:", searchQuery);
  console.log("Received referenceId:", referenceId);

  try {
    // Create an empty where clause
    const whereClause = {};

    // Add search query for candidateName if provided
    if (searchQuery) {
      whereClause.candidateName = {
        [Op.like]: `%${searchQuery}%`,
      };
    }

    // Only add referenceId to where clause if it's provided and not equal to "FORSTU"
    if (referenceId && referenceId !== "FORSTU") {
      whereClause.referenceId = referenceId;
    }

    const renewalProfiles = await MahadbtRenwalprofiles.findAll({
      where: whereClause,
    });

    return res.status(200).json({
      success: true,
      data: renewalProfiles,
    });
  } catch (error) {
    console.error("Error fetching profiles:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};





exports.getRenewalStudentDetails = async (req, res) => {
  const studentId = req.params.id;

  try {
    const student = await MahadbtRenwalprofiles.findByPk(studentId);

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

exports.sendincomeDocS3Renewal = async (req, res) => {
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
      const deleteResponse = await s3.send(new DeleteObjectsCommand(deleteParams));
      console.log("Objects in the folder deleted successfully:", deleteResponse.Deleted);
    }

    // Upload the new document
    const data = await s3.send(new PutObjectCommand(uploadParams));

    // Construct the URL of the uploaded object manually
    const objectUrl = `https://${uploadParams.Bucket}.s3.${AWS.config.region}.amazonaws.com/${uploadParams.Key}`;

    const updatedDataOfMain = {
      incomeDoc: objectUrl,
    };
    console.log("updatedDataOfMain", updatedDataOfMain);

    // Update database entry
    await MahadbtRenwalprofiles.update(updatedDataOfMain, {
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

exports.sendfeeReceiptS3Renewal = async (req, res) => {
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
      const deleteResponse = await s3.send(new DeleteObjectsCommand(deleteParams));
      console.log("Objects in the folder deleted successfully:", deleteResponse.Deleted);
    }

    // Upload the new document
    const data = await s3.send(new PutObjectCommand(uploadParams));

    // Construct the URL of the uploaded object manually
    const objectUrl = `https://${uploadParams.Bucket}.s3.${AWS.config.region}.amazonaws.com/${uploadParams.Key}`;

    const updatedDataOfMain = {
      feeReceiptDoc: objectUrl,
    };
    console.log("updatedDataOfMain", updatedDataOfMain);

    // Update database entry
    await MahadbtRenwalprofiles.update(updatedDataOfMain, {
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

exports.sendHostelCertToS3Renewal = async (req, res) => {
  try {
    const file = req.files.file;
    const uploadParams = {
      Bucket: "mahadbtdocs",
      Key: `${req.body.id}/hostelcert/${file.name}`,
      Body: file.data,
    };

    const listParams = {
      Bucket: "mahadbtdocs",
      Prefix: `${req.body.id}/hostelcert/`,
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
      const deleteResponse = await s3.send(new DeleteObjectsCommand(deleteParams));
      console.log("Objects in the folder deleted successfully:", deleteResponse.Deleted);
    }

    // Upload the new document
    const data = await s3.send(new PutObjectCommand(uploadParams));

    // Construct the URL of the uploaded object manually
    const objectUrl = `https://${uploadParams.Bucket}.s3.${AWS.config.region}.amazonaws.com/${uploadParams.Key}`;

    const updatedDataOfMain = {
      hostelCertificate: objectUrl,
    };
    console.log("updatedDataOfMain", updatedDataOfMain);

    // Update database entry
    await MahadbtRenwalprofiles.update(updatedDataOfMain, {
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

exports.sendalpabudharakCertS3Renewal = async (req, res) => {
  try {
    const file = req.files.file;
    const uploadParams = {
      Bucket: "mahadbtdocs",
      Key: `${req.body.id}/alpabudharakcert/${file.name}`,
      Body: file.data,
    };

    const listParams = {
      Bucket: "mahadbtdocs",
      Prefix: `${req.body.id}/alpabudharakcert/`,
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
      const deleteResponse = await s3.send(new DeleteObjectsCommand(deleteParams));
      console.log("Objects in the folder deleted successfully:", deleteResponse.Deleted);
    }

    // Upload the new document
    const data = await s3.send(new PutObjectCommand(uploadParams));

    // Construct the URL of the uploaded object manually
    const objectUrl = `https://${uploadParams.Bucket}.s3.${AWS.config.region}.amazonaws.com/${uploadParams.Key}`;

    const updatedDataOfMain = {
      alphabhudharakDoc: objectUrl,
    };
    console.log("updatedDataOfMain", updatedDataOfMain);

    // Update database entry
    await MahadbtRenwalprofiles.update(updatedDataOfMain, {
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

exports.sendDeclarationCertToS3Renewal = async (req, res) => {
  try {
    const file = req.files.file;
    const uploadParams = {
      Bucket: "mahadbtdocs",
      Key: `${req.body.id}/declarationcert/${file.name}`,
      Body: file.data,
    };

    const listParams = {
      Bucket: "mahadbtdocs",
      Prefix: `${req.body.id}/declarationcert/`,
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
      const deleteResponse = await s3.send(new DeleteObjectsCommand(deleteParams));
      console.log("Objects in the folder deleted successfully:", deleteResponse.Deleted);
    }

    // Upload the new document
    const data = await s3.send(new PutObjectCommand(uploadParams));

    // Construct the URL of the uploaded object manually
    const objectUrl = `https://${uploadParams.Bucket}.s3.${AWS.config.region}.amazonaws.com/${uploadParams.Key}`;

    const updatedDataOfMain = {
      declarationCertDoc: objectUrl,
    };
    console.log("updatedDataOfMain", updatedDataOfMain);

    // Update database entry
    await MahadbtRenwalprofiles.update(updatedDataOfMain, {
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


exports.sendRegisteredLabourCertToS3Renewal = async (req, res) => {
  try {
    const file = req.files.file;
    const uploadParams = {
      Bucket: "mahadbtdocs",
      Key: `${req.body.id}/registeredlabourcert/${file.name}`,
      Body: file.data,
    };

    const listParams = {
      Bucket: "mahadbtdocs",
      Prefix: `${req.body.id}/registeredlabourcert/`,
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
      const deleteResponse = await s3.send(new DeleteObjectsCommand(deleteParams));
      console.log("Objects in the folder deleted successfully:", deleteResponse.Deleted);
    }

    // Upload the new document
    const data = await s3.send(new PutObjectCommand(uploadParams));

    // Construct the URL of the uploaded object manually
    const objectUrl = `https://${uploadParams.Bucket}.s3.${AWS.config.region}.amazonaws.com/${uploadParams.Key}`;

    const updatedDataOfMain = {
      labourDoc: objectUrl,
    };
    console.log("updatedDataOfMain", updatedDataOfMain);

    // Update database entry
    await MahadbtRenwalprofiles.update(updatedDataOfMain, {
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

exports.sendStudentPanCardToS3Renewal = async (req, res) => {
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
      const deleteResponse = await s3.send(new DeleteObjectsCommand(deleteParams));
      console.log("Objects in the folder deleted successfully:", deleteResponse.Deleted);
    }

    // Upload the new document
    const data = await s3.send(new PutObjectCommand(uploadParams));

    // Construct the URL of the uploaded object manually
    const objectUrl = `https://${uploadParams.Bucket}.s3.${AWS.config.region}.amazonaws.com/${uploadParams.Key}`;

    const updatedDataOfMain = {
      studentPancardDoc: objectUrl,
    };
    console.log("updatedDataOfMain", updatedDataOfMain);

    // Update database entry
    await MahadbtRenwalprofiles.update(updatedDataOfMain, {
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

exports.sendFatherPanCardToS3Renewal = async (req, res) => {
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
      const deleteResponse = await s3.send(new DeleteObjectsCommand(deleteParams));
      console.log("Objects in the folder deleted successfully:", deleteResponse.Deleted);
    }

    // Upload the new document
    const data = await s3.send(new PutObjectCommand(uploadParams));

    // Construct the URL of the uploaded object manually
    const objectUrl = `https://${uploadParams.Bucket}.s3.${AWS.config.region}.amazonaws.com/${uploadParams.Key}`;

    const updatedDataOfMain = {
      fatherPancardDoc: objectUrl,
    };
    console.log("updatedDataOfMain", updatedDataOfMain);

    // Update database entry
    await MahadbtRenwalprofiles.update(updatedDataOfMain, {
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

exports.sendFatherAadharCardToS3Renewal = async (req, res) => {
  try {
    const file = req.files.file;
    const uploadParams = {
      Bucket: "mahadbtdocs",
      Key: `${req.body.id}/fatheraadharcard/${file.name}`,
      Body: file.data,
    };

    const listParams = {
      Bucket: "mahadbtdocs",
      Prefix: `${req.body.id}/fatheraadharcard/`,
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
      const deleteResponse = await s3.send(new DeleteObjectsCommand(deleteParams));
      console.log("Objects in the folder deleted successfully:", deleteResponse.Deleted);
    }

    // Upload the new document
    const data = await s3.send(new PutObjectCommand(uploadParams));

    // Construct the URL of the uploaded object manually
    const objectUrl = `https://${uploadParams.Bucket}.s3.${AWS.config.region}.amazonaws.com/${uploadParams.Key}`;

    const updatedDataOfMain = {
      fatherAadharcardDoc: objectUrl,
    };
    console.log("updatedDataOfMain", updatedDataOfMain);

    // Update database entry
    await MahadbtRenwalprofiles.update(updatedDataOfMain, {
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

exports.sendCasteValidityToS3Renewal = async (req, res) => {
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
      const deleteResponse = await s3.send(new DeleteObjectsCommand(deleteParams));
      console.log("Objects in the folder deleted successfully:", deleteResponse.Deleted);
    }

    // Upload the new document
    const data = await s3.send(new PutObjectCommand(uploadParams));

    // Construct the URL of the uploaded object manually
    const objectUrl = `https://${uploadParams.Bucket}.s3.${AWS.config.region}.amazonaws.com/${uploadParams.Key}`;

    const updatedDataOfMain = {
      casteValidityDoc: objectUrl,
    };
    console.log("updatedDataOfMain", updatedDataOfMain);

    // Update database entry
    await MahadbtRenwalprofiles.update(updatedDataOfMain, {
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

exports.sendAllotmentLetterToS3Renewal = async (req, res) => {
  try {
    const file = req.files.file;
    const uploadParams = {
      Bucket: "mahadbtdocs",
      Key: `${req.body.id}/allotmentletter/${file.name}`,
      Body: file.data,
    };

    const listParams = {
      Bucket: "mahadbtdocs",
      Prefix: `${req.body.id}/allotmentletter/`,
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
      const deleteResponse = await s3.send(new DeleteObjectsCommand(deleteParams));
      console.log("Objects in the folder deleted successfully:", deleteResponse.Deleted);
    }

    // Upload the new document
    const data = await s3.send(new PutObjectCommand(uploadParams));

    // Construct the URL of the uploaded object manually
    const objectUrl = `https://${uploadParams.Bucket}.s3.${AWS.config.region}.amazonaws.com/${uploadParams.Key}`;

    const updatedDataOfMain = {
      allotmentLetterDoc: objectUrl,
    };
    console.log("updatedDataOfMain", updatedDataOfMain);

    // Update database entry
    await MahadbtRenwalprofiles.update(updatedDataOfMain, {
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

exports.sendLeavingCertToS3Renewal = async (req, res) => {
  try {
    const file = req.files.file;
    const uploadParams = {
      Bucket: "mahadbtdocs",
      Key: `${req.body.id}/leavingcert/${file.name}`,
      Body: file.data,
    };

    const listParams = {
      Bucket: "mahadbtdocs",
      Prefix: `${req.body.id}/leavingcert/`,
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
      const deleteResponse = await s3.send(new DeleteObjectsCommand(deleteParams));
      console.log("Objects in the folder deleted successfully:", deleteResponse.Deleted);
    }

    // Upload the new document
    const data = await s3.send(new PutObjectCommand(uploadParams));

    // Construct the URL of the uploaded object manually
    const objectUrl = `https://${uploadParams.Bucket}.s3.${AWS.config.region}.amazonaws.com/${uploadParams.Key}`;

    const updatedDataOfMain = {
      leavingCertDoc: objectUrl,
    };
    console.log("updatedDataOfMain", updatedDataOfMain);

    // Update database entry
    await MahadbtRenwalprofiles.update(updatedDataOfMain, {
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


exports.sendRationCardToS3Renewal = async (req, res) => {
  try {
    const file = req.files.file;
    const uploadParams = {
      Bucket: "mahadbtdocs",
      Key: `${req.body.id}/rationcard/${file.name}`,
      Body: file.data,
    };

    const listParams = {
      Bucket: "mahadbtdocs",
      Prefix: `${req.body.id}/rationcard/`,
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
      const deleteResponse = await s3.send(new DeleteObjectsCommand(deleteParams));
      console.log("Objects in the folder deleted successfully:", deleteResponse.Deleted);
    }

    // Upload the new document
    const data = await s3.send(new PutObjectCommand(uploadParams));

    // Construct the URL of the uploaded object manually
    const objectUrl = `https://${uploadParams.Bucket}.s3.${AWS.config.region}.amazonaws.com/${uploadParams.Key}`;

    const updatedDataOfMain = {
      rationCardDoc: objectUrl,
    };
    console.log("updatedDataOfMain", updatedDataOfMain);

    // Update database entry
    await MahadbtRenwalprofiles.update(updatedDataOfMain, {
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

exports.sendPreviousYearMarksheetToS3Renewal = async (req, res) => {
  try {
    const file = req.files.file;
    const uploadParams = {
      Bucket: "mahadbtdocs",
      Key: `${req.body.id}/previousyearmarksheet/${file.name}`,
      Body: file.data,
    };

    const listParams = {
      Bucket: "mahadbtdocs",
      Prefix: `${req.body.id}/previousyearmarksheet/`,
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
      const deleteResponse = await s3.send(new DeleteObjectsCommand(deleteParams));
      console.log("Objects in the folder deleted successfully:", deleteResponse.Deleted);
    }

    // Upload the new document
    const data = await s3.send(new PutObjectCommand(uploadParams));

    // Construct the URL of the uploaded object manually
    const objectUrl = `https://${uploadParams.Bucket}.s3.${AWS.config.region}.amazonaws.com/${uploadParams.Key}`;

    const updatedDataOfMain = {
      previousYearMarksheetDoc: objectUrl,
    };
    console.log("updatedDataOfMain", updatedDataOfMain);

    // Update database entry
    await MahadbtRenwalprofiles.update(updatedDataOfMain, {
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

exports.sendGapCertToS3Renewal = async (req, res) => {
  try {
    const file = req.files.file;
    const uploadParams = {
      Bucket: "mahadbtdocs",
      Key: `${req.body.id}/gapcert/${file.name}`,
      Body: file.data,
    };

    const listParams = {
      Bucket: "mahadbtdocs",
      Prefix: `${req.body.id}/gapcert/`,
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
      const deleteResponse = await s3.send(new DeleteObjectsCommand(deleteParams));
      console.log("Objects in the folder deleted successfully:", deleteResponse.Deleted);
    }

    // Upload the new document
    const data = await s3.send(new PutObjectCommand(uploadParams));

    // Construct the URL of the uploaded object manually
    const objectUrl = `https://${uploadParams.Bucket}.s3.${AWS.config.region}.amazonaws.com/${uploadParams.Key}`;

    const updatedDataOfMain = {
      gapCertDoc: objectUrl,
    };
    console.log("updatedDataOfMain", updatedDataOfMain);

    // Update database entry
    await MahadbtRenwalprofiles.update(updatedDataOfMain, {
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



exports.personalInfo = (req, res) => {
  const { id, personalInfo_verified } = req.body; // Extract personalInfo_verified from the request body
  const updatedData = { personalInfo_verified }; // Prepare data for update

  MahadbtRenwalprofiles.update(updatedData, {
    where: {
      id: id,
    },
  })
    .then((num) => {
      if (num == 1) {
        res.json({
          success: true,
          message: "Mahadbt Renewal Profile was updated successfully.",
        });
      } else {
        res.json({
          success: false,
          message: `Cannot update Mahadbt Renewal Profile with id=${id}. Maybe the profile was not found or req.body is empty!`,
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: `Error updating Mahadbt Renewal Profile with id=${id}`,
        error: error,
      });
    });
};


exports.incomeDetails = (req, res) => {
  const { id, incomeDetails_verified } = req.body; // Extract incomeDetails_verified from the request body
  const updatedData = { incomeDetails_verified }; // Prepare data for update

  MahadbtRenwalprofiles.update(updatedData, {
    where: {
      id: id,
    },
  })
    .then((num) => {
      if (num == 1) {
        res.json({
          success: true,
          message: "Mahadbt Renewal Profile income details were updated successfully.",
        });
      } else {
        res.json({
          success: false,
          message: `Cannot update Mahadbt Renewal Profile income details with id=${id}. Maybe the profile was not found or req.body is empty!`,
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: `Error updating Mahadbt Renewal Profile income details with id=${id}`,
        error: error,
      });
    });
};


exports.updateCurrentCourseDetails = (req, res) => {
  const { id, currentCourse_verified } = req.body; // Extract currentCourse_verified from the request body
  const updatedData = { currentCourse_verified }; // Prepare data for update

  // Assuming MahadbtRenwalprofiles is your model and it has a method `update`
  MahadbtRenwalprofiles.update(updatedData, {
    where: {
      id: id,
    },
  })
    .then((num) => {
      if (num == 1) {
        res.json({
          success: true,
          message: "Mahadbt Renewal Profile current course details were updated successfully.",
        });
      } else {
        res.json({
          success: false,
          message: `Cannot update Mahadbt Renewal Profile current course details with id=${id}. Maybe the profile was not found or req.body is empty!`,
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: `Error updating Mahadbt Renewal Profile current course details with id=${id}`,
        error: error,
      });
    });
};



exports.updateHostelDetails = (req, res) => {
  const { id, hostelDetails_verified } = req.body; // Extract hostel_verified from the request body
  const updatedData = { hostelDetails_verified }; // Prepare data for update
   
  
   console.log(updatedData)
  // Assuming MahadbtRenwalprofiles is your model and it has a method `update`
  MahadbtRenwalprofiles.update(updatedData, {
    where: {
      id: id,
    },
  })
    .then((num) => {
      if (num == 1) {
        res.json({
          success: true,
          message: "Mahadbt Renewal Profile hostel details were updated successfully.",
        });
      } else {
        res.json({
          success: false,
          message: `Cannot update Mahadbt Renewal Profile hostel details with id=${id}. Maybe the profile was not found or req.body is empty!`,
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: `Error updating Mahadbt Renewal Profile hostel details with id=${id}`,
        error: error,
      });
    });
};


exports.updateSchemeDetails = (req, res) => {
  const { id, schemeWise_verified } = req.body; // Extract scheme_verified from the request body

  const updatedData = { schemeWise_verified }; // Prepare data for update
  console.log(id, schemeWise_verified); // Debugging logs

  MahadbtRenwalprofiles.update(updatedData, {
    where: { id: id },
  })
    .then((result) => {
      console.log('Update result:', result);
      if (result[0] > 0) { // result[0] is the number of affected rows
        res.json({
          success: true,
          message: "Mahadbt Renewal Profile scheme details were updated successfully.",
        });
      } else {
        res.json({
          success: false,
          message: `Cannot update Mahadbt Renewal Profile scheme details with id=${id}. Maybe the profile was not found or req.body is empty!`,
        });
      }
    })
    .catch((error) => {
      console.error('Update error:', error);
      res.status(500).json({
        success: false,
        message: `Error updating Mahadbt Renewal Profile scheme details with id=${id}`,
        error: error.message,
      });
    });
};



//Mark as login buttons 

exports.markAsSuccessful = (req, res) => {
  const { id} = req.body; // Extract 'id' and 'successful' (new value for mahadbt_Login) from the request body
  
  console.log(req.body);

  MahadbtRenwalprofiles.update(
    { mahadbt_Login: "Successful" }, // Update the mahadbt_Login column with the value of 'successful'
    { where: { id: id } } // Find the record by 'id'
  )
    .then((result) => {
      console.log('Update result:', result);
      if (result[0] > 0) { // result[0] is the number of affected rows
        res.json({
          success: true,
          message: "Mahadbt Renewal Profile scheme details were updated successfully.",
        });
      } else {
        res.json({
          success: false,
          message: `Cannot update Mahadbt Renewal Profile scheme details with id=${id}. Maybe the profile was not found or req.body is empty!`,
        });
      }
    })
    .catch((error) => {
      console.error('Update error:', error);
      res.status(500).json({
        success: false,
        message: `Error updating Mahadbt Renewal Profile scheme details with id=${id}`,
        error: error.message,
      });
    });
};

exports.markAsUnsuccessful = (req, res) => {
  const { id} = req.body; 
  console.log(req.body);

  MahadbtRenwalprofiles.update(
    { mahadbt_Login: "Unsuccessful" }, // Update the mahadbt_Login column with the value of 'successful'
    { where: { id: id } } // Find the record by 'id'
  )
    .then((result) => {
      console.log('Update result:', result);
      if (result[0] > 0) { // result[0] is the number of affected rows
        res.json({
          success: true,
          message: "Mahadbt Renewal Profile scheme details were updated successfully.",
        });
      } else {
        res.json({
          success: false,
          message: `Cannot update Mahadbt Renewal Profile scheme details with id=${id}. Maybe the profile was not found or req.body is empty!`,
        });
      }
    })
    .catch((error) => {
      console.error('Update error:', error);
      res.status(500).json({
        success: false,
        message: `Error updating Mahadbt Renewal Profile scheme details with id=${id}`,
        error: error.message,
      });
    });
};


//Doc Valid or Invalid

exports.validDoc = (req, res) => {
  const { id, documentType } = req.body;
  console.log(req.body);

  // Dynamic column update based on documentType
  let updateField = {};
  updateField[documentType] = "Valid";  // Use the documentType as the column name and set its value to 'Valid'
  console.log('Update query:', updateField, id);

  MahadbtRenwalprofiles.update(
    updateField,  // Dynamically update the column specified by documentType
    { where: { id: id } }  // Find the record by 'id'   
  )
    .then((result) => {
      console.log('Update result:', result);
      if (result[0] > 0) {  // result[0] is the number of affected rows
        res.json({
          success: true,
          message: "Mahadbt Renewal Profile scheme details were updated successfully.",
        });
      } else {
        res.json({
          success: false,
          message: `Cannot update Mahadbt Renewal Profile scheme details with id=${id}. Maybe the profile was not found or req.body is empty!`,
        });
      }
    })
    .catch((error) => {
      console.error('Update error:', error);
      res.status(500).json({
        success: false,
        message: `Error updating Mahadbt Renewal Profile scheme details with id=${id}`,
        error: error.message,
      });
    });
};


exports.invalidDoc = (req, res) => {
  const { id, documentType } = req.body;
  console.log(req.body);

  // Dynamic column update based on documentType
  let updateField = {};
  updateField[documentType] = "Invalid";  // Use the documentType as the column name and set its value to 'Valid'
  console.log('Update query:', updateField, id);

  MahadbtRenwalprofiles.update(
    updateField,  // Dynamically update the column specified by documentType
    { where: { id: id } }  // Find the record by 'id'   
  )
    .then((result) => {
      console.log('Update result:', result);
      if (result[0] > 0) {  // result[0] is the number of affected rows
        res.json({
          success: true,
          message: "Mahadbt Renewal Profile scheme details were updated successfully.",
        });
      } else {
        res.json({
          success: false,
          message: `Cannot update Mahadbt Renewal Profile scheme details with id=${id}. Maybe the profile was not found or req.body is empty!`,
        });
      }
    })
    .catch((error) => {
      console.error('Update error:', error);
      res.status(500).json({
        success: false,
        message: `Error updating Mahadbt Renewal Profile scheme details with id=${id}`,
        error: error.message,
      });
    });
};

exports.fetchRefCode = (req, res) => {
  const { username } = req.body;
  console.log('Request body:', req.body);

  // Fetch the ref_code based on the username
  UserTable.findOne({
    where: { username: username },
    attributes: ['ref_code'],  // Only select the ref_code field
  })
  .then(user => {
    if (user) {
      res.json({
        success: true,
        ref_code: user.ref_code,  // Return the ref_code
      });
    } else {
      res.json({
        success: false,
        message: `No user found with username=${username}`,
      });
    }
  })
  .catch(error => {
    console.error('Error fetching ref_code:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while fetching the ref_code',
      error: error.message,
    });
  });
};

// exports.updateRemarks = (req, res) => {
//   const { id, remarks } = req.body; // Extract 'id' and 'remarks' from req.body

//   // Log the request body for debugging purposes
//   console.log(req.body);

//   // Create an object to update the 'Remarks' column
//   const updateField = { Remarks: remarks };

//   // Log the update query and id
//   console.log('Update query:', updateField, id);

//   // Update the 'Remarks' column where the id matches
//   MahadbtRenwalprofiles.update(
//     updateField,  // The column to update and its new value
//     { where: { id: id } }  // Condition to find the specific record by 'id'
//   )
//     .then((result) => {
//       console.log('Update result:', result);
//       if (result[0] > 0) {  // Check if any rows were affected
//         res.json({
//           success: true,
//           message: "Remarks were updated successfully.",
//         });
//       } else {
//         res.json({
//           success: false,
//           message: `Cannot update Remarks with id=${id}. Maybe the profile was not found or req.body is empty!`,
//         });
//       }
//     })
//     .catch((error) => {
//       console.error('Update error:', error);
//       res.status(500).json({
//         success: false,
//         message: `Error updating Remarks with id=${id}`,
//         error: error.message,
//       });
//     });
// };


exports.updateRemarks = (req, res) => {
  const { id, remarks } = req.body;

  // Validate id and remarks before proceeding
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Missing 'id' in request body.",
    });
  }

  if (!Array.isArray(remarks) || remarks.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Remarks must be a non-empty array.",
    });
  }

  console.log('Received id:', id);
  console.log('Received Remarks:', remarks); // Log received remarks for debugging

  // Create the object for updating the 'Remarks' column
  const updateField = { Remarks: remarks };

  // Log the update query for debugging
  console.log('Update query:', updateField, id);

  // Perform the update
  MahadbtRenwalprofiles.update(
    updateField,  // Object with the field to update and new value
    { where: { id: id } }  // Condition to find the specific record by 'id'
  )
    .then((result) => {
      console.log('Update result:', result);

      // Check if any rows were updated
      if (result[0] > 0) {
        res.json({
          success: true,
          message: "Remarks were updated successfully.",
        });
      } else {
        res.status(404).json({
          success: false,
          message: `Cannot update Remarks with id=${id}. Maybe the profile was not found or the request body is incorrect!`,
        });
      }
    })
    .catch((error) => {
      console.error('Update error:', error);
      res.status(500).json({
        success: false,
        message: `Error updating Remarks with id=${id}`,
        error: error.message,
      });
    });
};


// exports.getRemarks = (req, res) => {
//   const { id } = req.body;
//   console.log(id);
//   // Validate id before proceeding
//   if (!id) {
//     return res.status(400).json({
//       success: false,
//       message: "Missing 'id' in request parameters.",
//     });
//   }

//   // Log the received id for debugging
//   console.log('Fetching remarks for id:', id);

//   // Perform the query to find the record by 'id'
//   MahadbtRenwalprofiles.findOne({
//     where: { id: id },
//     attributes: ['Remarks'], // Only fetch the 'Remarks' field
//   })
//     .then((result) => {
//       // Check if a record was found
//       if (result) {
//         res.json({
//           success: true,
//           remarks: result.Remarks, // Return the Remarks
//         });
//       } else {
//         res.status(404).json({
//           success: false,
//           message: `No profile found with id=${id}.`,
//         });
//       }
//     })
//     .catch((error) => {
//       console.error('Fetch error:', error);
//       res.status(500).json({
//         success: false,
//         message: `Error fetching remarks with id=${id}`,
//         error: error.message,
//       });
//     });
// };



exports.getRemarks = (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Missing 'id' in request parameters.",
    });
  }

  console.log('Fetching remarks for id:', id);

  MahadbtRenwalprofiles.findOne({
    where: { id: id },
    attributes: ['Remarks'],
  })
    .then((result) => {
      if (result) {
        let remarks = result.Remarks;

        console.log("rema", remarks);

        // Parse remarks if it's a stringified array
        if (typeof remarks === 'string') {
          try {
            remarks = JSON.parse(remarks);  // Parse the JSON string
          } catch (error) {
            console.error('Remarks parsing error:', error);
            return res.status(500).json({
              success: false,
              message: `Error parsing remarks for id=${id}`,
            });
          }
        }
          console.log("remarksssss", remarks);
        res.json({
          success: true,
          remarks: remarks,  // Send as an array
        });
      } else {
        res.status(404).json({
          success: false,
          message: `No profile found with id=${id}.`,
        });
      }
    })
    .catch((error) => {
      console.error('Fetch error:', error);
      res.status(500).json({
        success: false,
        message: `Error fetching remarks with id=${id}`,
        error: error.message,
      });
    });
};


exports.removeRemark = (req, res) => {
  const { id, remarkIndex } = req.body;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Missing 'id' in request parameters.",
    });
  }

  if (remarkIndex === undefined || remarkIndex < 0) {
    return res.status(400).json({
      success: false,
      message: "Missing or invalid 'remarkIndex' in request parameters.",
    });
  }

  console.log(`Removing remark at index ${remarkIndex} for id:`, id);

  MahadbtRenwalprofiles.findOne({
    where: { id: id },
    attributes: ['Remarks'],
  })
    .then((result) => {
      if (result) {
        let remarks = result.Remarks;

        console.log("Remarks before parsing:", remarks);

        // If remarks are in string format, parse them into an array
        if (typeof remarks === 'string') {
          try {
            remarks = JSON.parse(remarks);
          } catch (error) {
            console.error('Remarks parsing error:', error);
            return res.status(500).json({
              success: false,
              message: `Error parsing remarks for id=${id}`,
            });
          }
        }

        console.log("Remarks after parsing:", remarks);

        // Ensure that remarks is an array
        if (!Array.isArray(remarks)) {
          console.error('Remarks is not an array:', remarks);
          return res.status(500).json({
            success: false,
            message: 'Invalid remarks format. Expected an array.',
          });
        }

        // Check if remarkIndex is within bounds
        if (remarkIndex >= remarks.length) {
          return res.status(400).json({
            success: false,
            message: `Invalid remarkIndex: ${remarkIndex} for id=${id}.`,
          });
        }

        // Remove the remark by index
        remarks.splice(remarkIndex, 1);

        // Update the database with the new remarks array
        MahadbtRenwalprofiles.update(
          { Remarks: remarks }, // Directly save the updated array
          { where: { id: id } }
        )
          .then(() => {
            res.json({
              success: true,
              message: 'Remark removed successfully',
              remarks: remarks, // Return the updated remarks array
            });
          })
          .catch((error) => {
            console.error('Update error:', error);
            res.status(500).json({
              success: false,
              message: `Error updating remarks for id=${id}`,
              error: error.message,
            });
          });
      } else {
        res.status(404).json({
          success: false,
          message: `No profile found with id=${id}.`,
        });
      }
    })
    .catch((error) => {
      console.error('Fetch error:', error);
      res.status(500).json({
        success: false,
        message: `Error fetching remarks with id=${id}`,
        error: error.message,
      });
    });
};


exports.appSubmitted = (req, res) => {
  const { id} = req.body; // Extract 'id' and 'successful' (new value for mahadbt_Login) from the request body
  
  console.log(req.body);

  MahadbtRenwalprofiles.update(
    { Application_Status: "Submitted" }, // Update the mahadbt_Login column with the value of 'successful'
    { where: { id: id } } // Find the record by 'id'
  )
    .then((result) => {
      console.log('Update result:', result);
      if (result[0] > 0) { // result[0] is the number of affected rows
        res.json({
          success: true,
          message: "Mahadbt Renewal Profile application status were updated successfully.",
        });
      } else {
        res.json({
          success: false,
          message: `Cannot update  scheme details with id=${id}. Maybe the profile was not found or req.body is empty!`,
        });
      }
    })
    .catch((error) => {
      console.error('Update error:', error);
      res.status(500).json({
        success: false,
        message: `Error updating Mahadbt Renewal Profile scheme details with id=${id}`,
        error: error.message,
      });
    });
};

exports.appPending = (req, res) => {
  const { id} = req.body; // Extract 'id' and 'successful' (new value for mahadbt_Login) from the request body
  
  console.log(req.body);

  MahadbtRenwalprofiles.update(
    { Application_Status: "Pending" }, // Update the mahadbt_Login column with the value of 'successful'
    { where: { id: id } } // Find the record by 'id'
  )
    .then((result) => {
      console.log('Update result:', result);
      if (result[0] > 0) { // result[0] is the number of affected rows
        res.json({
          success: true,
          message: "Mahadbt Renewal Profile application status were updated successfully.",
        });
      } else {
        res.json({
          success: false,
          message: `Cannot update  scheme details with id=${id}. Maybe the profile was not found or req.body is empty!`,
        });
      }
    })
    .catch((error) => {
      console.error('Update error:', error);
      res.status(500).json({
        success: false,
        message: `Error updating Mahadbt Renewal Profile scheme details with id=${id}`,
        error: error.message,
      });
    });
};
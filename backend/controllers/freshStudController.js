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
  const shravani_allcolumns = require("../models/shravaniAllColumnsModel")

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

//used to load all the data from DB according to the user role 
  exports.getAllFreshStudForPageLoad = async (req, res) => {
    const refCode = req.body.referenceId; // Get referenceId from request
  
    try {
      let whereClause = {}; // Initialize an empty where clause
  
      // If referenceId is provided and it's not 'FORSTU', add it to the where clause
      if (refCode && refCode !== 'FORSTU') {
        whereClause.refCode = refCode;
      }
  
      // Fetch profiles based on the where clause
      const freshProfiles = await shravani_allcolumns.findAll({
        where: whereClause,
      });
  
      return res.status(200).json({
        success: true,
        data: freshProfiles,
      });
    } catch (error) {
      console.error("Error fetching profiles:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  

  //used to get student by id, it is used in upload documents modal
  exports.getFreshStudDetails = async (req, res) => {
    const studentId = req.params.id;
  
    try {
      const student = await shravani_allcolumns.findByPk(studentId); //findByPk method searches using primary key
  
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

// documents 
//controller for upload doc to S3 

exports.sendincomeDocS3Fresh = async (req, res) => {
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
      // incomeDoc: objectUrl,
      incomeDoc : objectUrl,
    };
    console.log("updatedDataOfMain", updatedDataOfMain);

    // Update database entry
    await shravani_allcolumns.update(updatedDataOfMain, {
      where: {
        id: req.body.id,
      },
    });

// console.log("Database update result:", updateResult);


    res.status(200).json({
      success: true,
      message: `${objectUrl} file(s) uploaded to S3 and database entry updated successfully.`,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
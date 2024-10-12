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


  exports.getAllFreshStudForPageLoad = async (req, res) => {
    const referenceId = req.body.referenceId; // Get referenceId from request
  
    try {
      let whereClause = {}; // Initialize an empty where clause
  
      // If referenceId is provided and it's not 'FORSTU', add it to the where clause
      if (referenceId && referenceId !== 'FORSTU') {
        whereClause.referenceId = referenceId;
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
  
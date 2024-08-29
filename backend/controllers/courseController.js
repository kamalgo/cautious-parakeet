const { Op } = require("sequelize");
const ROLES = require("../helpers/roles");
// const User = require("../models/usersModel");
// const collegeprofile = require("../models/collegeModel");

const { validationResult } = require("express-validator");
const { createHmac } = require("crypto");
const courseData = require("../models/courseModel");

const dotenv = require("dotenv");
dotenv.config();

exports.getAllCoursesList = (req, res) => {
  // res.send("Bhaiyajiiiiiii tesnion mat lo");
  courseData
    .findAll()
    .then((data) => {
      // console.log("your data req", data)
      // return
      data = JSON.stringify(data);
      data = JSON.parse(data);
      // console.log(data);
      res.json({
        success: true,
        data,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "Failed to retrieve course list",
        error: error,
      });
    });
};

const pass_encryptor = (plainPassword, salt) => {
  return createHmac("sha256", salt).update(plainPassword).digest("hex");
};

const { Sequelize } = require("sequelize");
const sequelize = require("../database/connection");
const ROLES = require("../helpers/roles");
const ExcelInfo = sequelize.define("excel_profiles", {
  // SrNo: {
  //   type: Sequelize.DataTypes.INTEGER,
  //   allowNull: false,
  //   autoIncrement: true,
  //   field: 'Sr.No'
  // },
  applicationId: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
    // primaryKey: true,
    // autoIncrement: true,
    unique: true,
    // field: 'Application ID'
  },
  candidateName: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
    // field: 'Candidate Name'
  },
  gender: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
    // field: 'Gender'
  },
  dob: {
    type: Sequelize.DataTypes.DATEONLY,
    allowNull: false,
    // field: 'DOB'
  },
  sscBoard: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
    // field: 'SSC Board'
  },
  sscPassingYear: {
    type: Sequelize.DataTypes.INTEGER,
    allowNull: false,
    // field: 'SSC Passing Year'
  },
  sscSeatNo: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
    // field: 'SSC Seat No'
  },
  sscTotalPercentage: {
    type: Sequelize.DataTypes.FLOAT,
    allowNull: false,
    // field: 'SSC Total Percentage'
  },
  qualifyingExam: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
    // field: 'Qualifying Exam'
  },
  hscBoard: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
    // field: 'HSC Board'
  },
  hscPassingYear: {
    type: Sequelize.DataTypes.INTEGER,
    allowNull: false,
    // field: 'HSC Passing Year'
  },
  hscSeatNo: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
    // field: 'HSC Seat No'
  },
  hscTotalPercentage: {
    type: Sequelize.DataTypes.FLOAT,
    allowNull: false,
    // field: 'HSC Total Percentage'
  },
  cetPercentile: {
    type: Sequelize.DataTypes.FLOAT,
    // field: 'CET Percentile'
  },
  courseName: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
    // field: 'Course Name'
  },
  prev_qualification_level: {
    type: Sequelize.DataTypes.STRING,
    allowNull: true,
  },
});
module.exports = ExcelInfo;
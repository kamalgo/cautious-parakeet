const { Sequelize } = require("sequelize");
const sequelize = require("../database/connection");
const ROLES = require("../helpers/roles");

const collegeprofile = sequelize.define("mahadbt_college_profiles", {
  id: {
    type: Sequelize.DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },

  institute_choice_code: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
  },

  institute_name: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  institute_state: {
    type: Sequelize.DataTypes.STRING,
    allowNull: true,
  },

  institute_district: {
    type: Sequelize.DataTypes.STRING,
    allowNull: true,
  },


  institute_taluka: {
    type: Sequelize.DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = collegeprofile;
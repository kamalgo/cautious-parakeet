const { DataTypes } = require('sequelize');
const sequelize = require("../database/connection");
const { Sequelize } = require("sequelize");


const admissionYear = sequelize.define('mahadbt_addmission_year', {
  Id: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  year: {
    type: DataTypes.INTEGER(11),
    defaultValue: null,
  },
});

module.exports = admissionYear;
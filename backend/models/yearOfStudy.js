const { DataTypes } = require('sequelize');
const sequelize = require("../database/connection");
const { Sequelize } = require("sequelize");


const YearOfStudy = sequelize.define('mahadbt_year_of_study', {
  Id: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  year: {
    type: DataTypes.STRING(25),
    defaultValue: null,
  },
});

module.exports = YearOfStudy;
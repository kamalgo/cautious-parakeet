const { DataTypes } = require('sequelize');
const sequelize = require("../database/connection");
const { Sequelize } = require("sequelize");


const examMonth = sequelize.define('mahadbt_exam_month', {
  Id: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  month: {
    type: DataTypes.STRING(20),
    defaultValue: null,
  },
});

module.exports = examMonth;
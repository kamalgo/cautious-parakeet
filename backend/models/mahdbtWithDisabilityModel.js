const { DataTypes } = require('sequelize');
const sequelize = require("../database/connection");
const { Sequelize } = require("sequelize");


const MdbtWithDisabilityType = sequelize.define('mahadbt_with_disability', {
  Id: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  Disability: {
    type: DataTypes.STRING(40),
    defaultValue: null,
  },
});

module.exports = MdbtWithDisabilityType;
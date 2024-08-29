const { DataTypes } = require('sequelize');
const sequelize = require("../database/connection");
const { Sequelize } = require("sequelize");


const MdbtDisabilityType = sequelize.define('mdbt_disability_type', {
  Id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  disability_type: {
    type: DataTypes.STRING(20),
    defaultValue: null,
  },
});

module.exports = MdbtDisabilityType;
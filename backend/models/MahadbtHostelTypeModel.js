const { DataTypes } = require('sequelize');
const sequelize = require("../database/connection");
const { Sequelize } = require("sequelize");


const MahadbtHostelTypes = sequelize.define('mahadbt_hostel_type', {
  Id: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  hostel_type_name: {
    type: DataTypes.STRING(30),
    defaultValue: null,
  },
});

module.exports = MahadbtHostelTypes;
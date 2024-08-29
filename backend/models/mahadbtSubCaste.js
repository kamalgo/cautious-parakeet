const { DataTypes } = require('sequelize');
const sequelize = require("../database/connection");
const { Sequelize } = require("sequelize");

const MahadbtSubCaste = sequelize.define('mahadbt_sub_caste', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  subcaste_name: {
    type: DataTypes.STRING(40),
    defaultValue: null,
  },
  caste_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = MahadbtSubCaste;
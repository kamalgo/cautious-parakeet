const { DataTypes } = require('sequelize');
const sequelize = require("../database/connection");
const { Sequelize } = require("sequelize");

const MahadbtCasteCatogory = sequelize.define('mahadbt_caste_category', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  category_name: {
    type: DataTypes.STRING(40),
    defaultValue: null,
  },
});

module.exports = MahadbtCasteCatogory;
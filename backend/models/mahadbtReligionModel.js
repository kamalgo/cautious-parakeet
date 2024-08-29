const { DataTypes } = require('sequelize');
const sequelize = require("../database/connection");
const { Sequelize } = require("sequelize");

const MahadbtReligion = sequelize.define('mahadbt_religion_id', {
  id: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    primaryKey: true,
  },
  religion_id: {
    type: DataTypes.STRING(10),
    defaultValue: null,
  },
});

module.exports = MahadbtReligion;
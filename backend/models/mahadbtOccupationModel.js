const { DataTypes } = require('sequelize');
const sequelize = require("../database/connection");
const { Sequelize } = require("sequelize");


const MahadbtOccupation = sequelize.define('mahadbt_occupation', {
  Id: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  occu_name: {
    type: DataTypes.STRING(20),
    defaultValue: null,
  },
});

module.exports = MahadbtOccupation;
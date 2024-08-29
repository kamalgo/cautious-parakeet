const { DataTypes } = require('sequelize');
const sequelize = require("../database/connection");
const { Sequelize } = require("sequelize");

const MahadbtMaritalStatus = sequelize.define('mahadbt_marital_status', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  marital_status: {
    type: DataTypes.STRING(10),
    defaultValue: null,
  },
});

module.exports = MahadbtMaritalStatus;
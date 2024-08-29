const { DataTypes } = require('sequelize');
const sequelize = require("../database/connection");
const { Sequelize } = require("sequelize");

const MahadbtQualificationLevel = sequelize.define('mahadbt_college_qualifilevel', {
  qualifilevel_id: {
    type: Sequelize.DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },

  college_id: {
    type: Sequelize.DataTypes.BIGINT,
    allowNull: true,
  },

  qualification_level: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = MahadbtQualificationLevel;
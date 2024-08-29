const { DataTypes } = require('sequelize');
const sequelize = require("../database/connection");
const { Sequelize } = require("sequelize");

const QualificationLevel = sequelize.define('qualification_master_data', {
  id: {
    type: Sequelize.DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },

  qualification_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = QualificationLevel;
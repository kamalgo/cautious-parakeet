const { DataTypes } = require('sequelize');
const sequelize = require("../database/connection");
const { Sequelize } = require("sequelize");

const MahadbtCourseName = sequelize.define('mahadbt_coursenames', {
  coursename_id: {
    type: Sequelize.DataTypes.BIGINT,
    allowNull: false,
  },

  college_id: {
    type: Sequelize.DataTypes.BIGINT,
    allowNull: true,
  },

  course_name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = MahadbtCourseName;
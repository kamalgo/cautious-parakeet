const { Sequelize } = require("sequelize");
const sequelize = require("../database/connection");
const ROLES = require("../helpers/roles");

const courseData = sequelize.define("mahadbt_courses", {
  id: {
    type: Sequelize.DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },

  course_id: {
    type: Sequelize.DataTypes.BIGINT,
    allowNull: true,
  },

  course_name: {
    type: Sequelize.DataTypes.STRING,
    allowNull: true,
  },

  qualification_level_id: {
    type: Sequelize.DataTypes.BIGINT,
    allowNull: true,
  },

  stream_id: {
    type: Sequelize.DataTypes.BIGINT,
    allowNull: true,
  },

});

module.exports = courseData;
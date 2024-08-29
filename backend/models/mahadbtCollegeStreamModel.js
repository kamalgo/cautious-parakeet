const { DataTypes } = require("sequelize");
const sequelize = require("../database/connection");
const collegeprofile = require("./collegeModel");

const MahadbtCollegeStream = sequelize.define("mahadbt_college_stream", {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    unique: true, // Ensure uniqueness
  },

  college_id: {
    type: DataTypes.BIGINT,
    allowNull: true,
    references: {
      model: collegeprofile,
      key: "id",
    },
  },

  qualification_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  stream_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = MahadbtCollegeStream;

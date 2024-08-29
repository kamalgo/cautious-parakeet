const { Sequelize } = require("sequelize");
const sequelize = require("../database/connection");
const ROLES = require("../helpers/roles");

const streamData = sequelize.define("stream_data", {
  stream_id: {
    type: Sequelize.DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },

  stream_name: {
    type: Sequelize.DataTypes.STRING,
    allowNull: true,
  },

});

module.exports = streamData;
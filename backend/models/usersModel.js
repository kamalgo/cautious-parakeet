const { Sequelize } = require("sequelize");
const sequelize = require("../database/connection");
const ROLES = require("../helpers/roles");

const User = sequelize.define("users", {
  id: {
    type: Sequelize.DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  username: {
    type: Sequelize.DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  mobile: {
    type: Sequelize.DataTypes.INTEGER,
    allowNull: true,
  },
  password: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: Sequelize.DataTypes.STRING,
    allowNull: true,
  },
  ref_code: {
    type: Sequelize.DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = User;

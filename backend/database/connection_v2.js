// database/connection_v2.js

const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelizeV2 = new Sequelize(
  process.env.MIGRATION_DB_NAME,
  process.env.MIGRATION_DB_USER,
  process.env.MIGRATION_DB_PASSWORD,
  {
    host: process.env.MIGRATION_DB_HOST,
    port: process.env.MIGRATION_DB_PORT || 3306,
    dialect: process.env.DB_DIALECT,
    logging: false,
    timezone: process.env.DB_TIMEZONE,
    dialectOptions: {
      timezone: "local"
    }
  }
);

module.exports = sequelizeV2;


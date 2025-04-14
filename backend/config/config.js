require('dotenv').config();

module.exports = {
  development: {
    username: process.env.MIGRATION_DB_USER,
    password: process.env.MIGRATION_DB_PASSWORD,
    database: process.env.MIGRATION_DB_NAME,
    host: process.env.MIGRATION_DB_HOST,
    port: process.env.MIGRATION_DB_PORT,
    dialect: 'mysql',
    timezone: '+05:30'
  }
};

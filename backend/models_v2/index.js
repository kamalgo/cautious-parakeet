// models_v2/index.js

const fs = require('fs');
const path = require('path');
const sequelize = require('../database/connection_v2'); // ← new DB connection
const Sequelize = require('sequelize');

const db = {};
const basename = path.basename(__filename);

fs.readdirSync(__dirname)
  .filter(file => file !== basename && file.endsWith('.js'))
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;







// const fs = require('fs');
// const path = require('path');
// const Sequelize = require('sequelize');
// require('dotenv').config();

// const basename = path.basename(__filename);

// // 🧠 Create Sequelize instance using env variables
// const sequelize = new Sequelize(
//   process.env.DEVELOPMENT_DB_NAME,
//   process.env.DEVELOPMENT_DB_USER,
//   process.env.DEVELOPMENT_DB_PASSWORD,
//   {
//     host: process.env.DEVELOPMENT_DB,
//     port: process.env.DEVELOPMENT_DB_PORT || 3306,
//     dialect: process.env.DB_DIALECT || 'mysql',
//     timezone: process.env.DB_TIMEZONE || '+05:30',
//     logging: false
//   }
// );

// const db = {};

// // 📦 Read all files in the models folder except index.js
// fs.readdirSync(__dirname)
//   .filter(file => file !== basename && file.endsWith('.js'))
//   .forEach(file => {
//     const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
//     db[model.name] = model;
//   });

// // 🔗 Run associations if defined
// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// module.exports = db;


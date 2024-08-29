// const sequelize = require('../config/database');
// const Example = require('../models/example');

// async function executeStoredProcedure() {
//   try {
//     const [result, metadata] = await sequelize.query('CALL YourStoredProcedure(:param1, :param2)', {
//       replacements: {
//         param1: 'value1',
//         param2: 'value2',
//       },
//       type: sequelize.QueryTypes.RAW,
//     });

//     // Process the result as needed
//     console.log(result);
//   } catch (error) {
//     console.error('Error executing stored procedure:', error);
//   }
// }

// // Call the function to execute the stored procedure
// executeStoredProcedure();

// utils/stored-procedures.js

const sequelize = require('../config/database');
const ExcelInfo = require("../models/testExcelModel");

async function executeStoredProcedure() {
  try {
    const [result, metadata] = await sequelize.query('CALL YourStoredProcedure(:param1, :param2)', {
      replacements: {
        param1: 'value1',
        param2: 'value2',
      },
      type: sequelize.QueryTypes.RAW,
    });

    // Process the result as needed
    console.log(result);
  } catch (error) {
    console.error('Error executing stored procedure:', error);
  }
}

module.exports = executeStoredProcedure;

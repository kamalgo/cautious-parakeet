// const mysql = require('mysql2/promise');
// const cron = require('node-cron');
// const winston = require('winston');
// require('dotenv').config();

// // Create a connection pool
// const pool = mysql.createPool({
//   host: process.env.DEVELOPMENT_DB,
//   user: process.env.DEVELOPMENT_DB_USER,
//   database: process.env.DEVELOPMENT_DB_NAME,
//   password: process.env.DEVELOPMENT_DB_PASSWORD,
//   port: process.env.DEVELOPMENT_DB_PORT || 3306, // Ensure the port is correct
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0
// });

// // Setup logging
// const logger = winston.createLogger({
//   level: 'info',
//   format: winston.format.combine(
//     winston.format.timestamp(),
//     winston.format.printf(({ timestamp, level, message }) => {
//       return `${timestamp} ${level}: ${message}`;
//     })
//   ),
//   transports: [
//     new winston.transports.Console(),
//     new winston.transports.File({ filename: 'app.log' })
//   ]
// });

// // Function to check for schema changes
// async function checkSchemaChanges() {
//   const query = `
//     SELECT COLUMN_NAME
//     FROM INFORMATION_SCHEMA.COLUMNS
//     WHERE TABLE_SCHEMA = ?
//     AND TABLE_NAME = ?
//   `;
//   const [columns] = await pool.execute(query, [process.env.DEVELOPMENT_DB_NAME, 'shravani_allcolumns']);
//   return columns.map(column => column.COLUMN_NAME);
// }

// (async () => {
//   try {
//     logger.info('Attempting to create a database connection');
//     const connection = await pool.getConnection();
//     logger.info('Database connection established');
//     connection.release();
//     logger.info('Database connection closed');
//   } catch (error) {
//     logger.error(`Error occurred: ${error.message}`);
//   }
// })();

// let lastProcessedId = 0; // Initialize the last processed ID

// cron.schedule('* * * * *', async () => {
//   try {
//     console.log('Running cron job');

//     const connection = await mysql.createConnection({
//       host: process.env.DEVELOPMENT_DB,
//       user: process.env.DEVELOPMENT_DB_USER,
//       database: process.env.DEVELOPMENT_DB_NAME,
//       password: process.env.DEVELOPMENT_DB_PASSWORD,
//       port: process.env.DEVELOPMENT_DB_PORT || 3306, // Ensure the port is correct
//     });

//     try {
//       // Query for records with IDs greater than the last processed ID
//       const [rows] = await connection.execute('SELECT * FROM shravani_allcolumns WHERE id > ?', [lastProcessedId]);

//       // Process the newly inserted records
//       for (const row of rows) {
//         console.log('Newly inserted record:', row);
//         // Process the record as needed
//       }

//       // Update the last processed ID to the maximum ID value found
//       if (rows.length > 0) {
//         const maxId = Math.max(...rows.map(row => row.id));
//         lastProcessedId = maxId;
//         console.log('Last processed ID updated to:', lastProcessedId);
//       } else {
//         console.log('No new records found');
//       }
//     } catch (error) {
//       console.error('Error occurred during query execution:', error);
//     } finally {
//       await connection.end();
//       console.log('Database connection closed after cron job');
//     }
//   } catch (error) {
//     console.error('Error occurred during cron job execution:', error);
//   }
// });



// ///this is to test the connection 

// // const mysql = require('mysql2/promise');
// // require('dotenv').config();

// // (async () => {
// //   try {
// //     console.log('Attempting to create a database connection');
// //     console.log(`Host: ${process.env.DEVELOPMENT_DB}`);
// //     console.log(`User: ${process.env.DEVELOPMENT_DB_USER}`);
// //     console.log(`Database: ${process.env.DEVELOPMENT_DB_NAME}`);
// //     console.log(`Port: ${process.env.DEVELOPMENT_DB_PORT || 3306}`);

// //     const connection = await mysql.createConnection({
// //       host: process.env.DEVELOPMENT_DB,
// //       user: process.env.DEVELOPMENT_DB_USER,
// //       database: process.env.DEVELOPMENT_DB_NAME,
// //       password: process.env.DEVELOPMENT_DB_PASSWORD,
// //       port: process.env.DEVELOPMENT_DB_PORT || 3306, // Ensure the port is correct
// //       connectTimeout: 10000 // Increased connection timeout to 10 seconds
// //     });

// //     console.log('Database connection establishedddddd');
// //     await connection.end();
// //     console.log('Database connection closed');
// //   } catch (error) {
// //     console.error('Error occurred:', error);
// //   }
// // })();




// // const cron = require('node-cron');
// // const mysql = require('mysql2/promise');
// // require('dotenv').config();

// // cron.schedule('* * * * *', async () => {
// //   console.log('Cron job started'); // Log when the cron job starts
  
// //   let connection;
// //   try {
// //     console.log('Attempting to create a database connection'); // Log before creating the connection
// //     connection = await mysql.createConnection({
// //       host: process.env.DEVELOPMENT_DB,
// //       user: process.env.DEVELOPMENT_DB_USER,
// //       database: process.env.DEVELOPMENT_DB_NAME,
// //       password: process.env.DEVELOPMENT_DB_PASSWORD,
// //       port: 4004, // Make sure to include the port
// //     });
// //     console.log('Database connection established'); // Log after connection is established
    
// //     // Query to check for updated records
// //     console.log('Executing query to check for updated records'); // Log before executing the query
// //     const [rows] = await connection.execute('SELECT * FROM shravani_allcolumns WHERE updated = true');
// //     console.log('Query executed successfully'); // Log after query is executed
// //     console.log(`Number of updated records found: ${rows.length}`); // Log the number of rows found
    
// //     if (rows.length > 0) {
// //       console.log('hi');
      
// //       // Optionally, you can reset the 'updated' flag to false after processing
// //       console.log('Resetting the "updated" flag to false'); // Log before executing the update query
// //       await connection.execute('UPDATE shravani_allcolumns SET updated = false WHERE updated = true');
// //       console.log('Update query executed successfully'); // Log after update query is executed
// //     }
// //   } catch (error) {
// //     console.error('Error occurred:', error); // Log any errors
// //   } finally {
// //     if (connection) {
// //       try {
// //         console.log('Closing the database connection'); // Log before closing the connection
// //         await connection.end();
// //         console.log('Database connection closed'); // Log after connection is closed
// //       } catch (closeError) {
// //         console.error('Error closing the connection:', closeError); // Log any errors when closing the connection
// //       }
// //     }
// //   }
// // });





// // const cron = require('node-cron');
// // const mysql = require('mysql2/promise');
// // require('dotenv').config();

// // cron.schedule('* * * * *', async () => {
// //   const connection = await mysql.createConnection({
// //     host: process.env.DEVELOPMENT_DB,
// //     user: process.env.DEVELOPMENT_DB_USER,
// //     database: process.env.DEVELOPMENT_DB_NAME,
// //     password: process.env.DEVELOPMENT_DB_PASSWORD,
// //     port: 4004, // Make sure to include the port
// //   });

// //   try {
// //     // Query to check for updated records
// //     const [rows] = await connection.execute('SELECT * FROM shravani_allcolumns WHERE updated = true');
    
// //     if (rows.length > 0) {
// //       console.log('hi');
      
// //       // Optionally, you can reset the 'updated' flag to false after processing
// //       await connection.execute('UPDATE shravani_allcolumns SET updated = false WHERE updated = true');
// //     }
// //   } catch (error) {
// //     console.error('Error occurred:', error);
// //   } finally {
// //     await connection.end();
// //   }
// // });

// /////////////////////////////////////////////////////////////////////////////////////////

// // const cron = require('node-cron');
// // const mysql = require('mysql2/promise');
// // require('dotenv').config();

// // cron.schedule('* * * * *', async () => {
// //   const connection = await mysql.createConnection({
// //     host: process.env.DB_HOST,  
// //     user: process.env.DB_USER,
// //     database: process.env.DB_NAME,
// //     password: process.env.DB_PASSWORD,
// //     port: process.env.DB_PORT,
// //   });

// //   try {
// //     // Query to check for updated records
// //     const [rows] = await connection.execute('SELECT * FROM shravani_allcolumns WHERE updated = true');
    
// //     if (rows.length > 0) {
// //       console.log('hi');
      
// //       // Optionally, you can reset the 'updated' flag to false after processing
// //       await connection.execute('UPDATE shravani_allcolumns SET updated = false WHERE updated = true');
// //     }
// //   } catch (error) {
// //     console.error('Error occurred:', error);
// //   } finally {
// //     await connection.end();
// //   }
// // });     

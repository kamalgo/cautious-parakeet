const { sequelize } = require("../database/database");

// Controller: Get all table names
const getAllTables = async (req, res) => {
  try {
    const [tables] = await sequelize.query("SHOW TABLES FROM `mahadbt_v2`");

    const tableNames = tables.map((table) => {
      const key = Object.keys(table)[0];
      return table[key];
    });

    res.json({ tables: tableNames });
  } catch (error) {
    console.error("Error fetching tables:", error);
    res.status(500).json({ error: "Failed to fetch tables" });
  }
};

// Controller: Get rows of a selected table
const getTableData = async (req, res) => {
  const { tableName } = req.params;

  try {
    const [rows] = await sequelize.query(`SELECT * FROM mahadbt_v2.${tableName}`);
    res.json({ rows });
  } catch (error) {
    console.error(`Error fetching data for table ${tableName}:`, error);
    res.status(500).json({ error: "Failed to fetch table data" });
  }
};

module.exports = {
  getAllTables,
  getTableData,
};

// src/app/pages/Admin/ManageTables.jsx

import React, { useEffect, useState } from "react";
import { getAllTables, getTableData } from "../../../api/TablesApi/TablesApi";
import Base from "../../../components/Base";

const ManageTables = () => {
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState("");
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch table names on mount
  useEffect(() => {
    async function fetchTables() {
      const data = await getAllTables();
      console.log("📋 Available tables:", data);
      setTables(data);
    }
    fetchTables();
  }, []);

  // Fetch records when table selected
  useEffect(() => {
    if (selectedTable) {
      fetchTableData(selectedTable);
    }
  }, [selectedTable]);

  const fetchTableData = async (table) => {
    setLoading(true);
    const data = await getTableData(table);
    console.log(`📦 Records for table ${table}:`, data);
    setTableData(data);
    setLoading(false);
  };

  return (
    <Base>
      <div className="container">
        <h2>🛠️ Manage Tables</h2>

        {/* Dropdown */}
        <select
          value={selectedTable}
          onChange={(e) => setSelectedTable(e.target.value)}
          style={{ marginBottom: "1rem", padding: "0.5rem" }}
        >
          <option value="">Select a Table</option>
          {tables.map((table) => (
            <option key={table} value={table}>
              {table}
            </option>
          ))}
        </select>

        {/* Table Records */}
        {loading && <p>Loading data...</p>}

        {!loading && selectedTable && tableData.length === 0 && (
          <p>No records found in {selectedTable}.</p>
        )}

        {!loading && tableData.length > 0 && (
          <table border="1" style={{ width: "100%", marginTop: "1rem" }}>
            <thead>
              <tr>
                {/* Dynamically create column headers */}
                {Object.keys(tableData[0]).map((col) => (
                  <th key={col}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((value, idx) => (
                    <td key={idx}>{value !== null ? value : "NULL"}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Base>
  );
};

export default ManageTables;

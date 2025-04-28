// src/app/api/TablesApi/TablesApi.js

import { isAuthenticated } from "../../helpers/AuthHelpers";
const ENDPOINT = import.meta.env.VITE_BACKEND_ENDPOINT;

// 📦 1. Fetch list of all available tables
export async function getAllTables() {
  const token = isAuthenticated()?.accessToken;
  
  try {
    const res = await fetch(`${ENDPOINT}/tables`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const responseData = await res.json();
    if (!res.ok) {
      console.error("❌ Error fetching tables:", responseData);
      return [];
    }
    return responseData.tables || [];
  } catch (error) {
    console.error("❌ Fetch error:", error);
    return [];
  }
}

// 📦 2. Fetch records from a selected table
export async function getTableData(tableName) {
  const token = isAuthenticated()?.accessToken;
  
  try {
    const res = await fetch(`${ENDPOINT}/tables/${tableName}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const responseData = await res.json();
    if (!res.ok) {
      console.error("❌ Error fetching table data:", responseData);
      return [];
    }
    return responseData.rows || [];
  } catch (error) {
    console.error("❌ Fetch error:", error);
    return [];
  }
}

// 📦 3. Create a new record in selected table
export async function createRecord(tableName, data) {
  const token = isAuthenticated()?.accessToken;

  try {
    const res = await fetch(`${ENDPOINT}/tables/${tableName}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await res.json();
    if (!res.ok) {
      console.error("❌ Error creating record:", responseData);
      return { success: false };
    }
    return { success: true };
  } catch (error) {
    console.error("❌ Fetch error:", error);
    return { success: false };
  }
}

// 📦 4. Update a record
export async function updateRecord(tableName, id, data) {
  const token = isAuthenticated()?.accessToken;

  try {
    const res = await fetch(`${ENDPOINT}/tables/${tableName}/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await res.json();
    if (!res.ok) {
      console.error("❌ Error updating record:", responseData);
      return { success: false };
    }
    return { success: true };
  } catch (error) {
    console.error("❌ Fetch error:", error);
    return { success: false };
  }
}

// 📦 5. Delete a record
export async function deleteRecord(tableName, id) {
  const token = isAuthenticated()?.accessToken;

  try {
    const res = await fetch(`${ENDPOINT}/tables/${tableName}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const responseData = await res.json();
    if (!res.ok) {
      console.error("❌ Error deleting record:", responseData);
      return { success: false };
    }
    return { success: true };
  } catch (error) {
    console.error("❌ Fetch error:", error);
    return { success: false };
  }
}

// src/api/sendDocToOCR.js

import { isAuthenticated } from "../../helpers/AuthHelpers";
import { redirectOnTokenExpire } from "../Auth";

const ENDPOINT = import.meta.env.VITE_BACKEND_ENDPOINT;

export async function sendDocToOCR(payload) {
  const { accessToken } = isAuthenticated();

  try {
    console.log("📦 Sending payload to /UPTA:", payload);

    const response = await fetch(`${ENDPOINT}/UPTA`, {
        
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(payload),
    });

    if (response.status === 401) {
      redirectOnTokenExpire();
      throw new Error("Token expired. Redirecting...");
    }

    if (!response.ok) {
      const errMsg = await response.text();
      throw new Error(`Backend error: ${errMsg}`);
    }

    const data = await response.json();
    console.log("✅ OCR Response:", data);
    return data;
  } catch (error) {
    console.error("❌ Error in sendDocToOCR:", error);
    throw error;
  }
}

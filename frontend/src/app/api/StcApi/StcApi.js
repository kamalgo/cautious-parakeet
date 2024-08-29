import { isAuthenticated } from "../../helpers/AuthHelpers";
import { redirectOnTokenExpire } from "../Auth";

const ENDPOINT = import.meta.env.VITE_BACKEND_ENDPOINT;

export async function getTtcollegeTranches() {
    const { accessToken } = isAuthenticated();
  
    const response = await fetch(`${ENDPOINT}//ttcollege/tranches`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: accessToken,
      },
    });
  
    if (response.status == 401) {
      redirectOnTokenExpire();
    }
  
    return response.json();
  }

  //////////////////////////////////////////////////////////////////////////////////////
  // /ttcollege/payment/:paymentId

// Function to update payment status
export async function updatePaymentStatus(paymentId, newStatus) {
    try {
      const { accessToken } = isAuthenticated();
  
      const response = await fetch(`${ENDPOINT}/ttcollege/payment/${paymentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: accessToken,
        },
        body: JSON.stringify({ status: newStatus }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to update payment status");
      }
  
      return { success: true };
    } catch (error) {
      console.error("Error updating payment status:", error);
      return { success: false, error: error.message };
    }
  }
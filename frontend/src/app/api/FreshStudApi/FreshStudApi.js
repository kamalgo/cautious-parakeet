import { isAuthenticated } from "../../helpers/AuthHelpers";
import { redirectOnTokenExpire } from "../Auth";

const ENDPOINT = import.meta.env.VITE_BACKEND_ENDPOINT;

export async function editFreshStudentApi(data) {
  const { accessToken } = isAuthenticated();

  console.log("Data being sent to API:", JSON.stringify(data, null, 2));

  const response = await fetch(`${ENDPOINT}/updateMahadbtFreshProfile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken,
    },
    body: JSON.stringify(data),
  });

  console.log("API Response Status:", response.status);

  if (response.status === 401) {
    redirectOnTokenExpire();
    return { success: false, message: "Token expired" };
  }

  const responseData = await response.json();
  console.log("API Response Data:", responseData);

  return responseData;
}

  // export async function editFreshStudentApi(data) {
  //   const { accessToken } = isAuthenticated();
  
  //   console.log("data in editstudentapi",data);
  
  //   const response = await fetch(`${ENDPOINT}/updateMahadbtFreshProfile`, {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //       Authorization: accessToken,
  //     },
  //     body: JSON.stringify(data),
  //   });
  
  //   if (response.status == 401) {
  //     redirectOnTokenExpire();
  //   }
  
  //   return response.json();
  // }

export async function getAllFreshStudForPageLoad(referenceId = "") {
    const { accessToken } = isAuthenticated();
  
    try {
      const response = await fetch(`${ENDPOINT}/getAllFreshStudForPageLoad`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: accessToken,
        },
        body: JSON.stringify({ referenceId }),
      });
  
      if (response.status === 401) {
        redirectOnTokenExpire();
        throw new Error("Token expired");
      }
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("All Renewal Students Data:", data);
  
      return data;
    } catch (error) {
      console.error("Error fetching all renewal students:", error);
      throw error;
    }
  }


  export async function incomeDocS3Fresh(formData) {
    const { accessToken } = isAuthenticated();
  
    try {
      const response = await fetch(`${ENDPOINT}/sendincomeDocS3Fresh`, {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      if (response.status === 401) {
        redirectOnTokenExpire();
        throw new Error("Token expired");
      }
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      return response.json();
    } catch (error) {
      console.error("Error in API call:", error);
      throw error;
    }
  }



    // export async function fetchRecordDetails(id) {
  //   const { accessToken } = isAuthenticated();
  
  //   try {
  //     console.log("Ridddddd",id);
  //       const response = await fetch(`${ENDPOINT}/getFreshStudDetails/${id}`, {
  //           method: "GET",
  //           headers: {
  //               "Content-Type": "application/json",
  //               Accept: "application/json",
  //               Authorization: accessToken,
  //           },
  //       });
  
  //       if (response.status === 401) {
  //           redirectOnTokenExpire();
  //           throw new Error("Token expired");
  //       }
  
  //       if (!response.ok) {
  //           throw new Error(`HTTP error! status: ${response.status}`);
  //       }
  
  //       const data = await response.json();
  //       console.log("Record Details Response:", data); // Print the response data
        
  //       return data;
  //   } catch (error) {
  //       console.error("Error fetching record details:", error);
  //       throw error;
  //   }
  // }


  export async function fetchRecordDetails(id) {
    const { accessToken } = isAuthenticated();
  
    try {
      console.log("Ridddddd", id); // Check if id is correctly passed
  
      const url = `${ENDPOINT}/getFreshStudDetails/${id}`;
      console.log("API Request URL:", url); // Log the complete URL
  
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: accessToken,
        },
      });
  
      if (response.status === 401) {
        redirectOnTokenExpire();
        throw new Error("Token expired");
      }
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("Record Details Response:", data); // Print the response data
  
      return data;
    } catch (error) {
      console.error("Error fetching record details:", error);
      throw error;
    }
  }
  
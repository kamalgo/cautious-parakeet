import { isAuthenticated } from "../../helpers/AuthHelpers";
import { redirectOnTokenExpire } from "../Auth";
const ENDPOINT = import.meta.env.VITE_BACKEND_ENDPOINT;

export async function getAllPaymentsApi() {
  const { accessToken } = isAuthenticated();

  const response = await fetch(`${ENDPOINT}/getAllPaymentsApi`, {
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

  const data = await response.json();
  console.log('API response data:', data);
  return data;
}


//add students api // sends data to backend and saves it in DB 
export async function addStudentApi(studentData) {
  const { accessToken } = isAuthenticated();
   
  console.log('student data on addStudentApi bus stop',studentData);

  const response = await fetch(`${ENDPOINT}/addStudent`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken,
    },
    body: JSON.stringify(studentData),
  });

  if (response.status === 401) {
    redirectOnTokenExpire();
  }

  const data = await response.json();
  return data;
} 


// Example implementation of uploadPfmsExcelApi
export const uploadPfmsExcelApi = async (data) => {
  try {
    console.log('it is on uploadPfmsExcelApi bus stop',data)
    const response = await fetch(`${ENDPOINT}/uploadPfmsExcel`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.error('Error uploading PFMS Excel data:', error);
    return { success: false, error: error.message };
  }
};


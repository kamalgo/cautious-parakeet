import { isAuthenticated } from "../../helpers/AuthHelpers";
import { redirectOnTokenExpire } from "../Auth";
const ENDPOINT = import.meta.env.VITE_BACKEND_ENDPOINT;

// export async function getStudentsViewApi() {
//   const { accessToken } = isAuthenticated();

//   const response = await fetch(`${ENDPOINT}/getStudentsView`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json",
//       Authorization: accessToken,
//     },
//   });

//   if (response.status == 401) {
//     redirectOnTokenExpire();
//   }

//   return response.json();
// }

export async function getPendingStudentsViewApi() {
  const { accessToken } = isAuthenticated();

  const response = await fetch(`${ENDPOINT}/getpendingstudentsview`, {
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

export async function getSubmittedStudentsViewApi() {
  const { accessToken } = isAuthenticated();

  const response = await fetch(`${ENDPOINT}/getsubmittedstudentsview`, {
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

export async function getEmailsofpendingstudentsApi() {
  const { accessToken } = isAuthenticated();

  const response = await fetch(`${ENDPOINT}/getEmailsofpendingstudents`, {
    method: "POST",
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

export async function sendEmailToStudentMicrositeApi(data) {
  const { accessToken } = isAuthenticated();

  const response = await fetch(`${ENDPOINT}/sendemailtostudentmicrosite`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken,
    },
    body: JSON.stringify(data),
  });

  if (response.status == 401) {
    redirectOnTokenExpire();
  }

  return response.json();
}

export async function executeScholarShipApplicationApi(data) {
  const { accessToken } = isAuthenticated();

  const response = await fetch(`${ENDPOINT}/executejar`, {
    method: "POST",
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

export async function studentprofileviewApi(data) {
  console.log(data, "data");
  // const { accessToken } = isAuthenticated();

  const response = await fetch(`${ENDPOINT}/studentprofileview`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      // Authorization: accessToken,
    },
    body: JSON.stringify(data),
  });

  if (response.status == 401) {
    redirectOnTokenExpire();
  }

  return response.json();
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//addStudent, this api will add student on the manual insertion from GUI on the Students section

export async function addStudent(data) {
  console.log("data is on StudentApis bus stop ", data);
  const { accessToken } = isAuthenticated();

  try {
    const response = await fetch(`${ENDPOINT}/addS`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: accessToken,
      },
      body: JSON.stringify(data),
    });

    // Check if the response status is 401 and handle token expiration
    if (response.status === 401) {
      console.log("Token expired, redirecting...");
      redirectOnTokenExpire();
      return;
    }

    // Parse the response JSON
    const responseData = await response.json();

    // Log the response data to the console
    console.log("Response from backend:", responseData);

    return responseData;
  } catch (error) {
    // Handle any errors that occur during the fetch operation
    console.error("Error adding student:", error);
  }
}

////////////////////////////////////////////////////////////////////

export async function getStudentsViewApi() {
  const { accessToken } = isAuthenticated();

  const response = await fetch(`${ENDPOINT}/getallthestudents`, {
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

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function editStudentApi(data) {
  const { accessToken } = isAuthenticated();

  console.log("data in editstudentapi",data);

  const response = await fetch(`${ENDPOINT}/editStudent`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken,
    },
    body: JSON.stringify(data),
  });

  if (response.status == 401) {
    redirectOnTokenExpire();
  }

  return response.json();
}
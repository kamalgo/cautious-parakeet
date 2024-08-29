import { isAuthenticated } from "../helpers/AuthHelpers";
import { redirectOnTokenExpire } from "./Auth";
const ENDPOINT = import.meta.env.VITE_BACKEND_ENDPOINT;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//it fetches data from backend, it fetches from routes forstuTranchesRoutes

export async function getstudentstranch() {
  const { accessToken } = isAuthenticated();

  const response = await fetch(`${ENDPOINT}/getallcandidates`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken,
    },
  });

  if (response.status === 401) {
    redirectOnTokenExpire();
  }

  const responseData = await response.json();
  console.log("Shravani all columns:", responseData); // Print response in console
  return responseData;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Get student details by application Id
// export async function getScAppIdApi(applicationId) {
  
export async function getScAppIdApi(ApplicationID) {
    const { accessToken } = isAuthenticated();

  ///studenttranches/:ApplicationID
  try {
    const response = await fetch(`${ENDPOINT}/studenttranches/${ApplicationID}`, {
    // const response = await fetch(`${ENDPOINT}/student/${applicationId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: accessToken,
      },
    });

    if (response.status === 401) {
      redirectOnTokenExpire();
    }

    const responseData = await response.json();
    console.log("Student details by application ID:", responseData); // Print response in console
    return responseData;
  } catch (error) {
    console.error('Error fetching application ID:', error);
    throw error;
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//charge subscriptions
export async function chargeSubscription(data) {
  const { accessToken } = isAuthenticated();

  try {
    const response = await fetch(`${ENDPOINT}/charge-subscription`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: accessToken,
      },
      body: JSON.stringify(data),
    });

    if (response.status === 401) {
      redirectOnTokenExpire();
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error charging subscription:', error);
    throw error;
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//addStudent, this api will add student on the manual insertion from GUI on the ScTracker section 

export async function addTranch(data) {
  console.log("data is on addtranch bus stop ", data);
  const { accessToken } = isAuthenticated();

  try {
    const response = await fetch(`${ENDPOINT}/addtranch`, {
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
      console.log('Token expired, redirecting...');
      redirectOnTokenExpire();
      return;
    }

    // Parse the response JSON
    const responseData = await response.json();

    // Log the response data to the console
    console.log('Response from backend:', responseData);

    return responseData;
  } catch (error) {
    // Handle any errors that occur during the fetch operation
    console.error('Error adding student:', error);
  }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//addStudent, this api will add student on the manual insertion from GUI on the ScTracker section 

export async function addCandidates(data) {
  console.log("data is on addtranch bus stop ", data);
  const { accessToken } = isAuthenticated();

  try {
    const response = await fetch(`${ENDPOINT}/addCandidate`, {
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
      console.log('Token expired, redirecting...');
      redirectOnTokenExpire();
      return;
    }

    // Parse the response JSON
    const responseData = await response.json();

    // Log the response data to the console
    console.log('Response from backend:', responseData);

    return responseData;
  } catch (error) {
    // Handle any errors that occur during the fetch operation
    console.error('Error adding student:', error);
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// getStudentTcount

export async function getStudentTcount(ApplicationID) {
  const { accessToken } = isAuthenticated();

///studenttranches/:ApplicationID
try {
  const response = await fetch(`${ENDPOINT}/candidate-count/${ApplicationID}`, {
  // const response = await fetch(`${ENDPOINT}/student/${applicationId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: accessToken,
    },
  });

  if (response.status === 401) {
    redirectOnTokenExpire();
  }

  const responseData = await response.json();
  console.log("Student details by application ID:", responseData); // Print response in console
  return responseData;
} catch (error) {
  console.error('Error fetching application ID:', error);
  throw error;
}
}
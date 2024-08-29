import { isAuthenticated } from "../helpers/AuthHelpers";
import { redirectOnTokenExpire } from "./Auth";
const ENDPOINT = import.meta.env.VITE_BACKEND_ENDPOINT;

export async function getAllCollegesApi() {
  const { accessToken } = isAuthenticated();

  const response = await fetch(`${ENDPOINT}/getAllCollegeProfiles`, {
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

export async function addCollageApi(data) {
  const { accessToken } = isAuthenticated();

  const response = await fetch(`${ENDPOINT}/createNewCollegeProfile`, {
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

export async function deleteCollageApi(id) {
  const { accessToken } = isAuthenticated();

  const response = await fetch(`${ENDPOINT}/deletecollegeProfile`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken,
    },
    body: JSON.stringify(id),
  });

  if (response.status == 401) {
    redirectOnTokenExpire();
  }

  return response.json();
}

export async function updateCollageApi(user) {
  const { accessToken } = isAuthenticated();

  const response = await fetch(`${ENDPOINT}/updatecollegeProfile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken,
    },
    body: JSON.stringify(user),
  });

  if (response.status == 401) {
    redirectOnTokenExpire();
  }

  return response.json();
}

export async function downloadCSVFileOfCOllegeListFunctionApi() {
  const { accessToken } = isAuthenticated();

  const response = await fetch(`${ENDPOINT}/downloadcsvforcollegelist`, {
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

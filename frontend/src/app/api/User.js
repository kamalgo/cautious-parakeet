import { isAuthenticated } from "../helpers/AuthHelpers";
import { redirectOnTokenExpire } from "./Auth";
const ENDPOINT = import.meta.env.VITE_BACKEND_ENDPOINT;

export async function getAllUserApi() {
  const { accessToken } = isAuthenticated();

  const response = await fetch(`${ENDPOINT}/users`, {
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

export async function addUserApi(user) {
  const { accessToken } = isAuthenticated();

  const response = await fetch(`${ENDPOINT}/user`, {
    method: "POST",
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

export async function deleteUserApi(id) {
  const { accessToken } = isAuthenticated();

  const response = await fetch(`${ENDPOINT}/user`, {
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

export async function updateUserApi(user) {
  const { accessToken } = isAuthenticated();

  const response = await fetch(`${ENDPOINT}/user`, {
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

export async function downloadCSVFileOfUserListFunctionApi() {
  const { accessToken } = isAuthenticated();

  const response = await fetch(`${ENDPOINT}/downloadcsvforuserlist`, {
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

import { isAuthenticated } from "../../helpers/AuthHelpers";

const ENDPOINT = import.meta.env.VITE_BACKEND_ENDPOINT;

export async function getQualificationLevelDropdownApi() {
  const { accessToken } = isAuthenticated();

  const response = await fetch(`${ENDPOINT}/getqualificationlevel`, {
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

export async function getStreamLevelDropdownApi() {
  const { accessToken } = isAuthenticated();

  const response = await fetch(`${ENDPOINT}/getstreamlevel`, {
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

export async function getAllQualificationInfoApi() {
  const { accessToken } = isAuthenticated();

  const response = await fetch(`${ENDPOINT}/getAllQualificationinfo`, {
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

export async function addQualificationInfoApi(data) {
  const { accessToken } = isAuthenticated();

  const response = await fetch(`${ENDPOINT}/addqualificationinfo`, {
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

export async function updateStreamApi(data) {
  const { accessToken } = isAuthenticated();

  const response = await fetch(`${ENDPOINT}/updatequalificationinfo`, {
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

export async function deleteStreamApi(id) {
  console.log("id", id);
  const { accessToken } = isAuthenticated();

  const response = await fetch(`${ENDPOINT}/deletequalificationinfo`, {
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

import { isAuthenticated } from "../../helpers/AuthHelpers";

const ENDPOINT = import.meta.env.VITE_BACKEND_ENDPOINT;

export async function getMaritalStatusApi() {
  const { accessToken } = isAuthenticated();

  const response = await fetch(`${ENDPOINT}/getmaritalstatus`, {
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

export async function getReligionListApi() {
  const { accessToken } = isAuthenticated();

  const response = await fetch(`${ENDPOINT}/getreligionlist`, {
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

export async function getCasteCatogoryListApi() {
  const { accessToken } = isAuthenticated();

  const response = await fetch(`${ENDPOINT}/getcastecatogorylist`, {
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

export async function getDisabilityTypeListApi() {
  const { accessToken } = isAuthenticated();

  const response = await fetch(`${ENDPOINT}/getdisabilitytypelist`, {
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

export async function getDisabilityWithTypeListApi() {
  const { accessToken } = isAuthenticated();

  const response = await fetch(`${ENDPOINT}/getdisabilitywithtypelist`, {
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

export async function getOccpationListApi() {
  const { accessToken } = isAuthenticated();

  const response = await fetch(`${ENDPOINT}/getoccpationlist`, {
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

export async function getHostelTypeApi() {
  const { accessToken } = isAuthenticated();

  const response = await fetch(`${ENDPOINT}/gethosteltype`, {
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

export async function getQualificationLevelListApi() {
  const { accessToken } = isAuthenticated();

  const response = await fetch(`${ENDPOINT}/getqualificationlevellist`, {
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

export async function getYearOfStudylListApi() {
  const { accessToken } = isAuthenticated();

  const response = await fetch(`${ENDPOINT}/getyearofstudyllist`, {
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

export async function getSSCAdmissionYearApi() {
  const { accessToken } = isAuthenticated();

  const response = await fetch(`${ENDPOINT}/getsscadmissionyear`, {
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

export async function getHSCAdmissionYearApi() {
  const { accessToken } = isAuthenticated();

  const response = await fetch(`${ENDPOINT}/gethscadmissionyear`, {
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

export async function getSSCExamMonthApi() {
  const { accessToken } = isAuthenticated();

  const response = await fetch(`${ENDPOINT}/getsscexammonth`, {
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

export async function geHSCExamMonthApi() {
  const { accessToken } = isAuthenticated();

  const response = await fetch(`${ENDPOINT}/gethscexammonth`, {
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

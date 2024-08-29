import { isAuthenticated } from "../../helpers/AuthHelpers";
import { redirectOnTokenExpire } from "../Auth";

const ENDPOINT = import.meta.env.VITE_BACKEND_ENDPOINT;

export async function getTotalStudentsApi() {
  const { accessToken } = isAuthenticated();

  const response = await fetch(`${ENDPOINT}/getProfileCount`, {
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

export async function getTotalEligibleStudentsApi() {
  const { accessToken } = isAuthenticated();

  const response = await fetch(`${ENDPOINT}/getElgCount`, {
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

export async function getTotalSubmitCountOfApplicationApi() {
  const { accessToken } = isAuthenticated();

  const response = await fetch(`${ENDPOINT}/totalSubCount`, {
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

export async function getTotalSubmitCountOfApplicationByCasteApi() {
  const { accessToken } = isAuthenticated();

  const response = await fetch(`${ENDPOINT}/totalsubcountbycaste`, {
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

export async function getMonthlySubmitCountApi() {
  const { accessToken } = isAuthenticated();

  const response = await fetch(`${ENDPOINT}/monthlycount`, {
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

export async function getYearlySubmitCountApi() {
  const { accessToken } = isAuthenticated();

  const response = await fetch(`${ENDPOINT}/yearlycount`, {
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

export async function getDailySubmitCountApi() {
  const { accessToken } = isAuthenticated();

  const response = await fetch(`${ENDPOINT}/dailycount`, {
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

export async function downloadCsvForApplicationStatusFunctionApi() {
  const { accessToken } = isAuthenticated();

  const response = await fetch(`${ENDPOINT}/downloadcsvforapplicationstatus`, {
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

export async function downloadCsvForCastewiseApplicationStatusApi() {
  const { accessToken } = isAuthenticated();

  const response = await fetch(
    `${ENDPOINT}/downloadcsvforcastewiseapplicationstatus`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: accessToken,
      },
    }
  );

  if (response.status == 401) {
    redirectOnTokenExpire();
  }

  return response.json();
}

export async function downloadCSVFileforPendingReasonFunctionApi() {
  const { accessToken } = isAuthenticated();

  const response = await fetch(`${ENDPOINT}/downloadcsvforpendingreason`, {
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

export async function downloadCSVFileforDailySubmittedApplicationFunctionApi() {
  const { accessToken } = isAuthenticated();

  const response = await fetch(
    `${ENDPOINT}/downloadcsvforapplicationsubmittedasperdate`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: accessToken,
      },
    }
  );

  if (response.status == 401) {
    redirectOnTokenExpire();
  }

  return response.json();
}

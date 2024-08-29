import { isAuthenticated } from "../../helpers/AuthHelpers";
import { redirectOnTokenExpire } from "../Auth";
const ENDPOINT = import.meta.env.VITE_BACKEND_ENDPOINT;

export async function getCourseListOptionApi() {
  const { accessToken } = isAuthenticated();

  const response = await fetch(`${ENDPOINT}/getcourseslist`, {
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

export async function courseAndYearWiseDataSent(data) {
  // console.log("MMMMMMMMM", data);
  const { accessToken } = isAuthenticated();

  const response = await fetch(`${ENDPOINT}/courseandyearwisedata`, {
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

export async function getYears(data) {
  const { accessToken } = isAuthenticated();

  const response = await fetch(`${ENDPOINT}/getYearsFromCourse`, {
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

export async function courseAndYearWiseApplicationStatus(data) {
  // console.log("MMMMMMMMM", data);
  const { accessToken } = isAuthenticated();

  const response = await fetch(
    `${ENDPOINT}/applicationcountbycoursenameandyear`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: accessToken,
      },
      body: JSON.stringify(data),
    }
  );

  if (response.status == 401) {
    redirectOnTokenExpire();
  }

  return response.json();
}

export async function downloadCSVFileforYearandCoursewisePendingApplicationListFunctionApi() {
  const { accessToken } = isAuthenticated();

  const response = await fetch(
    `${ENDPOINT}/downloadcsvforyearandcoursewisependingapplication`,
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

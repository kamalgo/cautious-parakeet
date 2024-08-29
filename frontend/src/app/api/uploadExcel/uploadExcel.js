import { isAuthenticated } from "../../helpers/AuthHelpers";
const ENDPOINT = import.meta.env.VITE_BACKEND_ENDPOINT;

export async function uploadExcelApi(data) {
  const { accessToken } = isAuthenticated();

  const response = await fetch(`${ENDPOINT}/upload`, {
    method: "POST",
    headers: {
      Authorization: accessToken,
    },
    body: data,
  });

  //   if (response.status == 401) {
  //     redirectOnTokenExpire();
  //   }

  return response.json();
}

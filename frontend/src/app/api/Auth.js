import { signout } from "../helpers/AuthHelpers";


export async function signin(user) {
  const ENDPOINT = import.meta.env.VITE_BACKEND_ENDPOINT;

  const response = await fetch(`${ENDPOINT}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(user),
  });

  return response.json();
}

// export async function changePassword(data) {
//   const ENDPOINT = import.meta.env.VITE_BACKEND_ENDPOINT;

//   const response = await fetch(`${ENDPOINT}/signin`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json",
//     },
//     body: JSON.stringify(data),
//   });

//   if (response.status == 401) {
//     redirectOnTokenExpire();
//   }

//   return response.json();
// }

export function redirectOnTokenExpire() {
  signout(() => {
    setTimeout(function () {
      window.location.replace("/signin");
    }, import.meta.env.VITE_REDIRECTION_DURATION);
  });
}

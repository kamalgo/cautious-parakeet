import { isAuthenticated } from "../../helpers/AuthHelpers";
const ENDPOINT = import.meta.env.VITE_BACKEND_ENDPOINT;

export async function uploadCSVApi(data) {
  const { accessToken } = isAuthenticated();

  const response = await fetch(`${ENDPOINT}/csvupload`, {
    method: "POST",
    // headers: {
    //   Authorization: accessToken,
    // },
    body: data,
  });

  //   if (response.status == 401) {
  //     redirectOnTokenExpire();
  //   }

  return response.json();
}


// import axios from 'axios';

// const uploadCSVApi = async (formData) => {
//   try {
//     const response = await axios.post('http://localhost:4004/api/csv/create-subscription', formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data'
//       }
//     });
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// export { uploadCSVApi };


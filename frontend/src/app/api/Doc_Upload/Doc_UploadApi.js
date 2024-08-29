import { isAuthenticated } from "../../helpers/AuthHelpers";
import { redirectOnTokenExpire } from "../Auth";

const ENDPOINT = import.meta.env.VITE_BACKEND_ENDPOINT;

export async function fetchstud() {
  const { accessToken } = isAuthenticated();

  try {
    const response = await fetch(`${ENDPOINT}/fetchstud`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: accessToken,
      },
    });

    if (response.status === 401) {
      redirectOnTokenExpire();
      return;
    }

    const data = await response.json();
    console.log("Fetched data in Api:", data); // Print the response data to the console
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////

// export async function castecertS3() {
//     const { accessToken } = isAuthenticated();
  
//     const response = await fetch(`${ENDPOINT}/submitcastedocument`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//         Authorization: accessToken,
//       },
//     });
  
//     if (response.status == 401) {
//       redirectOnTokenExpire();
//     }
  
//     return response.json();
//   }

export async function castecertS3(formData) {
  const { accessToken } = isAuthenticated();

  try {
    const response = await fetch(`${ENDPOINT}/sendCasteDocumentToS3`, {
      method: "PUT",
      body: formData,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status === 401) {
      redirectOnTokenExpire();
      throw new Error("Token expired");
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error in API call:", error);
    throw error;
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////
export async function sendFeeReceiptToS3(formData) {
  const { accessToken } = isAuthenticated();

  try {
    const response = await fetch(`${ENDPOINT}/sendFeeReceiptToS3`, {
      method: "PUT",
      body: formData,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status === 401) {
      redirectOnTokenExpire();
      throw new Error("Token expired");
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error in API call:", error);
    throw error;
  }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export async function sendHostelCertificateToS3(formData) {
  const { accessToken } = isAuthenticated();

  try {
    const response = await fetch(`${ENDPOINT}/sendHostelCertificateToS3`, {
      method: "PUT",
      body: formData,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status === 401) {
      redirectOnTokenExpire();
      throw new Error("Token expired");
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error in API call:", error);
    throw error;
  }
}

/////////////////////////////////////////////////////////////////////////////////////////////
export async function sendAlpabudharakCertificateToS3(formData) {
  const { accessToken } = isAuthenticated();

  try {
    const response = await fetch(`${ENDPOINT}/sendAlpabudharakCertificateToS3`, {
      method: "PUT",
      body: formData,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status === 401) {
      redirectOnTokenExpire();
      throw new Error("Token expired");
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error in API call:", error);
    throw error;
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
export async function sendLabourCertificateToS3(formData) {
  const { accessToken } = isAuthenticated();

  try {
    const response = await fetch(`${ENDPOINT}/sendLabourCertificateToS3`, {
      method: "PUT",
      body: formData,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status === 401) {
      redirectOnTokenExpire();
      throw new Error("Token expired");
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error in API call:", error);
    throw error;
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export async function sendFamilyMemberBeneficiaryCertificateToS3(formData) {
  const { accessToken } = isAuthenticated();

  try {
    const response = await fetch(`${ENDPOINT}/sendFamilyMemberBeneficiaryCertificateToS3`, {
      method: "PUT",
      body: formData,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status === 401) {
      redirectOnTokenExpire();
      throw new Error("Token expired");
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error in API call:", error);
    throw error;
  }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export async function sendStudentPanCardToS3(formData) {
  const { accessToken } = isAuthenticated();

  try {
    const response = await fetch(`${ENDPOINT}/sendStudentPanCardToS3`, {
      method: "PUT",
      body: formData,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status === 401) {
      redirectOnTokenExpire();
      throw new Error("Token expired");
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error in API call:", error);
    throw error;
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export async function sendFatherPanCardToS3(formData) {
  const { accessToken } = isAuthenticated();

  try {
    const response = await fetch(`${ENDPOINT}/sendFatherPanCardToS3`, {
      method: "PUT",
      body: formData,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status === 401) {
      redirectOnTokenExpire();
      throw new Error("Token expired");
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error in API call:", error);
    throw error;
  }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
export async function sendFatherAadhaarCardToS3(formData) {
  const { accessToken } = isAuthenticated();

  try {
    const response = await fetch(`${ENDPOINT}/sendFatherAadhaarCardToS3`, {
      method: "PUT",
      body: formData,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status === 401) {
      redirectOnTokenExpire();
      throw new Error("Token expired");
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error in API call:", error);
    throw error;
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export async function sendCasteValidityToS3(formData) {
  const { accessToken } = isAuthenticated();

  try {
    const response = await fetch(`${ENDPOINT}/sendCasteValidityToS3`, {
      method: "PUT",
      body: formData,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status === 401) {
      redirectOnTokenExpire();
      throw new Error("Token expired");
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error in API call:", error);
    throw error;
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export async function sendLeavingCertificateToS3(formData) {
  const { accessToken } = isAuthenticated();

  try {
    const response = await fetch(`${ENDPOINT}/sendLeavingCertificateToS3`, {
      method: "PUT",
      body: formData,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status === 401) {
      redirectOnTokenExpire();
      throw new Error("Token expired");
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error in API call:", error);
    throw error;
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export async function sendRationCardToS3(formData) {
  const { accessToken } = isAuthenticated();

  try {
    const response = await fetch(`${ENDPOINT}/sendRationCardToS3`, {
      method: "PUT",
      body: formData,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status === 401) {
      redirectOnTokenExpire();
      throw new Error("Token expired");
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error in API call:", error);
    throw error;
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export async function sendPreviousYearMarksheetToS3(formData) {
  const { accessToken } = isAuthenticated();

  try {
    const response = await fetch(`${ENDPOINT}/sendPreviousYearMarksheetToS3`, {
      method: "PUT",
      body: formData,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status === 401) {
      redirectOnTokenExpire();
      throw new Error("Token expired");
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error in API call:", error);
    throw error;
  }
}

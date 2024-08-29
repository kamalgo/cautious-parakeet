import { isAuthenticated } from "../../helpers/AuthHelpers";
import { redirectOnTokenExpire } from "../Auth";

const ENDPOINT = import.meta.env.VITE_BACKEND_ENDPOINT;

export async function FreshStudentApi(searchQuery = "") {
  const { accessToken } = isAuthenticated();

  const response = await fetch(`${ENDPOINT}/getallFreshStudents?q=${searchQuery}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken,
    },
  });

  if (response.status === 401) {
    redirectOnTokenExpire();
  }

  return response.json();
}

// New function to fetch record details
export async function fetchRecordDetails(id) {
  const { accessToken } = isAuthenticated();

  const response = await fetch(`${ENDPOINT}/getFreshStudentDetails/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken,
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
}

export async function castecertS3Fresh(formData) {
  const { accessToken } = isAuthenticated();

  try {
    const response = await fetch(`${ENDPOINT}/sendCasteDocumentToS3Fresh`, {
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

export async function incomeDocS3Fresh(formData) {
  const { accessToken } = isAuthenticated();

  try {
    const response = await fetch(`${ENDPOINT}/sendIncomeDocumentToS3Fresh`, {
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

export async function feeReceiptS3Fresh(formData) {
  const { accessToken } = isAuthenticated();

  try {
    const response = await fetch(`${ENDPOINT}/sendFeeReceiptToS3Fresh`, {
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


export async function hostelCertS3Fresh(formData) {
  const { accessToken } = isAuthenticated();

  try {
    const response = await fetch(`${ENDPOINT}/sendhostelCertS3Fresh`, {
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

export async function alpabudharakCertS3Fresh(formData) {
  const { accessToken } = isAuthenticated();

  try {
    const response = await fetch(`${ENDPOINT}/sendalpabudharakCertS3Fresh`, {
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

export async function registeredLabourCertS3Fresh(formData) {
  const { accessToken } = isAuthenticated();

  try {
    const response = await fetch(`${ENDPOINT}/sendregisteredLabourCertS3Fresh`, {
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

export async function declarationCertS3Fresh(formData) {
  const { accessToken } = isAuthenticated();

  try {
    const response = await fetch(`${ENDPOINT}/senddeclarationCertS3Fresh`, {
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

export async function studentPanCardS3Fresh(formData) {
  const { accessToken } = isAuthenticated();

  try {
    const response = await fetch(`${ENDPOINT}/sendstudentPanCardS3Fresh`, {
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

 export async function fatherPanCardS3Fresh(formData) {
  const { accessToken } = isAuthenticated();

  try {
    const response = await fetch(`${ENDPOINT}/sendfatherPanCardS3Fresh`, {
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

 
export async function fatherAadharCardS3Fresh(formData) {
  const { accessToken } = isAuthenticated();

  try {
    const response = await fetch(`${ENDPOINT}/sendfatherAadharCardS3Fresh`, {
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

 
export async function casteValidityS3Fresh(formData) {
  const { accessToken } = isAuthenticated();

  try {
    const response = await fetch(`${ENDPOINT}/sendCasteValidityS3Fresh`, {
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



export async function leavingCertS3Fresh(formData) {
  const { accessToken } = isAuthenticated();

  try {
    const response = await fetch(`${ENDPOINT}/sendleavingCertS3Fresh`, {
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
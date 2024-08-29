//This API is used for college dashboard

import { isAuthenticated } from "../../helpers/AuthHelpers";
import { redirectOnTokenExpire } from "../Auth";

const ENDPOINT = import.meta.env.VITE_BACKEND_ENDPOINT;

export async function getCandidatesCountApi() {
    const { accessToken } = isAuthenticated();

    if (!accessToken) {
        console.error("Access token is missing");
        return;
    }

    try {
        const response = await fetch(`${ENDPOINT}/getCandidatesCount`, {
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

        if (!response.ok) {
            console.error(`HTTP error! status: ${response.status}`);
            return;
        }

        const data = await response.json();
        console.log('Response data:', data);
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
    }
}


// import { isAuthenticated } from "../../helpers/AuthHelpers";
// import { redirectOnTokenExpire } from "../Auth";

// const ENDPOINT = import.meta.env.VITE_BACKEND_ENDPOINT;

// export async function getCandidatesCountApi() {
//     const { accessToken } = isAuthenticated();
  
//     const response = await fetch(`${ENDPOINT}/getCandidatesCount`, {
//       method: "GET",
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
  
// }
  
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//getForstuTranchesCount

export async function getForstuTranchesCountApi() {
    const { accessToken } = isAuthenticated();

    if (!accessToken) {
        console.error("Access token is missing");
        return;
    }

    try {
        const response = await fetch(`${ENDPOINT}/getForstuTranchesCount`, {
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

        if (!response.ok) {
            console.error(`HTTP error! status: ${response.status}`);
            return;
        }

        const data = await response.json();
        console.log('Response aa:', data);
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////

//this API fetches Sum of amount_receivable column 

export async function getTotalAmountReceivableApi() {
    const { accessToken } = isAuthenticated();

    if (!accessToken) {
        console.error("Access token is missing");
        return;
    }

    try {
        const response = await fetch(`${ENDPOINT}/getTotalAmountReceivable`, {
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

        if (!response.ok) {
            console.error(`HTTP error! status: ${response.status}`);
            return;
        }

        const data = await response.json();
        console.log('Response receivabale amount:', data);
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//getTotalAmountReceived

//this API fetches Sum of amount_received column from this forstu_tranches table

export async function getTotalAmountReceivedApi() {
    const { accessToken } = isAuthenticated();

    if (!accessToken) {
        console.error("Access token is missing");
        return;
    }

    try {
        const response = await fetch(`${ENDPOINT}/getTotalAmountReceived`, {
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

        if (!response.ok) {
            console.error(`HTTP error! status: ${response.status}`);
            return;
        }

        const data = await response.json();
        console.log('Response received amount:', data);
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//getForstuTranchOneCount

export async function getForstuTranchOneCountApi() {
    const { accessToken } = isAuthenticated();

    if (!accessToken) {
        console.error("Access token is missing");
        return;
    }

    try {
        const response = await fetch(`${ENDPOINT}/getForstuTranchOneCount`, {
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

        if (!response.ok) {
            console.error(`HTTP error! status: ${response.status}`);
            return;
        }

        const data = await response.json();
        console.log('Response Tranche 1 count :', data);
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//getForstuTranchTwoCount

export async function getForstuTranchTwoCountApi() {
    const { accessToken } = isAuthenticated();

    if (!accessToken) {
        console.error("Access token is missing");
        return;
    }

    try {
        const response = await fetch(`${ENDPOINT}/getForstuTranchTwoCount`, {
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

        if (!response.ok) {
            console.error(`HTTP error! status: ${response.status}`);
            return;
        }

        const data = await response.json();
        console.log('Response Tranche 2 count :', data);
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////
//getCandidatesCount
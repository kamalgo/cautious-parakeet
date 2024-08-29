

export async function getOTPforStudent(to) {
  console.log("tooooo", to)
  const ENDPOINT = import.meta.env.VITE_BACKEND_ENDPOINT;

  const response = await fetch(`${ENDPOINT}/sendopttostudent`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(to),
  });

  return response.json();
}



export async function verifyStudentByOtpAndEmail(data) {
  const ENDPOINT = import.meta.env.VITE_BACKEND_ENDPOINT;

  const response = await fetch(`${ENDPOINT}/verifystudent`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
}
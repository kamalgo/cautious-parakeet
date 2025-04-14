import { isAuthenticated } from "../../helpers/AuthHelpers";
const ENDPOINT = import.meta.env.VITE_BACKEND_ENDPOINT;

export async function getAllProjects() {
  const token = isAuthenticated()?.accessToken;
  console.log("🔐 Token being sent:", token);

  try {
    const res = await fetch(`${ENDPOINT}/projects`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, // ✅ Important
        "Content-Type": "application/json",
      },
    });

    const responseData = await res.json();

    if (!res.ok) {
      console.error("❌ Error response:", responseData);
      return [];
    }

    return responseData; // Assuming your backend sends an array
  } catch (error) {
    console.error("❌ Fetch error:", error);
    return [];
  }
}

export async function createProject(projectData) {
  const token = isAuthenticated()?.accessToken;
  console.log("📤 Creating project:", projectData);

  try {
    const res = await fetch(`${ENDPOINT}/projects`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projectData),
    });

    const responseData = await res.json();

    if (!res.ok) {
      console.error("❌ Error creating project:", responseData);
      return { success: false, message: responseData?.error || "Error" };
    }

    return { success: true, data: responseData };
  } catch (error) {
    console.error("❌ Create error:", error);
    return { success: false, message: "Something went wrong!" };
  }
}

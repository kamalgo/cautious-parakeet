import React, { useEffect, useState } from "react";
import { getAllProjects, createProject } from "../../api/ProjectsApi/ProjectsApi";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newProjectName, setNewProjectName] = useState("");

  useEffect(() => {
    fetchProjects(); // Initial load
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data = await getAllProjects(); // API call
      if (Array.isArray(data)) {
        setProjects(data); // Set fresh data
      } else {
        console.warn("Unexpected API response format");
        setProjects([]);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Error loading projects");
    } finally {
      setLoading(false);
    }
  };

  const handleAddProject = async (e) => {
    e.preventDefault();

    const result = await createProject({ project_name: newProjectName });

    if (result.success) {
      alert("✅ Project added!");
      setNewProjectName("");    // Clear the input
      await fetchProjects();    // ✅ Re-fetch from backend
    } else {
      alert("❌ Failed to add: " + result.message);
    }
  };

  return (
    <div className="container">
      <h2>📂 Project List</h2>

      <form onSubmit={handleAddProject} style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Enter project name"
          value={newProjectName}
          onChange={(e) => setNewProjectName(e.target.value)}
          required
        />
        <button type="submit">➕ Add Project</button>
      </form>

      {loading && <p>Loading projects...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && !error && projects.length === 0 && <p>No projects found.</p>}

      <ul>
        {projects.map((project) => (
          <li key={project.project_id}>{project.project_name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Projects;



// import React, { useEffect, useState } from "react";
// import { getAllProjects, createProject } from "../../api/ProjectsApi/ProjectsApi";

// const Projects = () => {
//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(true); // Optional: for loading UI
//   const [error, setError] = useState(null); // Optional: for error UI
//   const [newProjectName, setNewProjectName] = useState("");

//   useEffect(() => {
//     const fetchProjects = async () => {
//       const data = await getAllProjects();
//       console.log("📦 Projects fetched:", data);
//       if (Array.isArray(data)) {
//         setProjects(data);
//       } else {
//         console.warn("Unexpected API response format");
//         setProjects([]);
//       }
//       setLoading(false); // Stop loading after data is fetched
//     };

//     fetchProjects();
//   }, []);

//   return (
//     <div className="container">
//       <h2>📂 Project List</h2>
//       <form
//         onSubmit={async (e) => {
//           e.preventDefault();
//           const result = await createProject({ project_name: newProjectName });
//           if (result.success) {
//             alert("✅ Project added!");
//             setNewProjectName("");

//             // Directly update the state without re-fetching
//             setProjects((prevProjects) => [
//               ...prevProjects,
//               { project_name: newProjectName, project_id: result.newProjectId },
//             ]);
//           } else {
//             alert("❌ Failed to add: " + result.message);
//           }
//         }}
//         style={{ marginBottom: "1rem" }}
//       >
//         <input
//           type="text"
//           placeholder="Enter project name"
//           value={newProjectName}
//           onChange={(e) => setNewProjectName(e.target.value)}
//           required
//         />
//         <button type="submit">➕ Add Project</button>
//       </form>

//       {loading && <p>Loading projects...</p>}
//       {error && <p style={{ color: "red" }}>{error}</p>}

//       {!loading && !error && projects.length === 0 && <p>No projects found.</p>}

//       <ul>
//         {projects.map((project) => (
//           <li key={project.project_id}>{project.project_name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Projects;

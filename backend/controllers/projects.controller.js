const db = require("../models_v2");

// GET all projects
const getAllProjects = async (req, res) => {
  try {
    const data = await db.Projects.findAll();
    res.json(data);
  } catch (err) {
    console.error("Error fetching projects:", err);
    res.status(500).json({ error: err.message });
  }
};

// POST a new project
const createProject = async (req, res) => {
  try {
    const { project_name } = req.body;
    const project = await db.Projects.create({ project_name });
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// UPDATE a project
const updateProject = async (req, res) => {
  try {
    const { project_name } = req.body;
    const updated = await db.Projects.update(
      { project_name },
      { where: { project_id: req.params.id } }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE a project
const deleteProject = async (req, res) => {
  try {
    await db.Projects.destroy({ where: { project_id: req.params.id } });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  getAllProjects,
  createProject,
  updateProject,
  deleteProject,
};

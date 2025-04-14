const express = require("express");
const router = express.Router();
const {
  getAllProjects,
  createProject,
  updateProject,
  deleteProject,
} = require("../controllers/projects.controller");

const { authenticateToken } = require("../helpers/authtoken"); // your middleware
const ROLES = require("../helpers/roles");

// ✅ Only allow ADMIN (Super Admin) to access
const restrictToAdmin = (req, res, next) => {
  if (req.user?.role === ROLES.ADMIN) {
    next();
  } else {
    return res.status(403).json({ error: "Access denied" });
  }
};

router.get("/", authenticateToken, restrictToAdmin, getAllProjects);
router.post("/", authenticateToken, restrictToAdmin, createProject);
router.put("/:id", authenticateToken, restrictToAdmin, updateProject);
router.delete("/:id", authenticateToken, restrictToAdmin, deleteProject);

module.exports = router;

const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../helpers/authtoken");
const ROLES = require("../helpers/roles");

const { getAllTables, getTableData } = require("../controllers/manageTables.controller");

// Middleware to restrict to admin
const restrictToAdmin = (req, res, next) => {
  if (req.user?.role === ROLES.ADMIN) {
    next();
  } else {
    return res.status(403).json({ error: "Access denied" });
  }
};

// Routes
router.get("/tables", authenticateToken, restrictToAdmin, getAllTables);
router.get("/tables/:tableName", authenticateToken, restrictToAdmin, getTableData);

module.exports = router;

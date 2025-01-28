const express = require("express");
const router = express.Router();

const { updateStudent, bulkUpdateStudents } = require("../controllers/auditController");

// const authenticateUser = require("../middleware/auth");

// router.put("/students/:id", authenticateUser, updateStudent);
// router.put("/students", authenticateUser, bulkUpdateStudents);

module.exports = router;

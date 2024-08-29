const { Sequelize } = require("sequelize");
const Mahadbtprofiles = require("../models/candidate_infoModel");

async function getAllTheStudents(req, res) {
  try {
    const data = await Mahadbtprofiles.findAll({});
    console.log("Retrieved data:", data);
    res.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Error retrieving students:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve students",
      error: error.message,
    });
  }
}

async function addStudent(req, res) {
  try {
    console.log("Received student data:", req.body);
    const newStudent = await Mahadbtprofiles.create(req.body);
    res.status(201).json(newStudent);
  } catch (error) {
    console.error("Error adding student:", error);
    if (error instanceof Sequelize.ValidationError) {
      res.status(400).json({ error: "Validation error", message: error.message });
    } else {
      res.status(500).json({ error: "Internal server error", message: error.message });
    }
  }
}

// async function editStudent(req, res) {
//   try {
//     console.log("Received updated student data:", req.body);
//     const id = parseInt(req.body.id, 10);
//     if (isNaN(id)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid ID",
//       });
//     }
//     const student = await Mahadbtprofiles.findByPk(id);
//     if (!student) {
//       return res.status(404).json({
//         success: false,
//         message: "Student not found",
//       });
//     }
//     const result = await Mahadbtprofiles.update(req.body, {
//       where: {
//         id: id,
//       },
//     });
//     console.log("Rows updated:", result[0]);
//     res.status(200).json({
//       success: true,
//       message: `${result[0]} row(s) updated`,
//     });
//   } catch (error) {
//     console.error("Error updating student:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// }

module.exports = {
  getAllTheStudents,
  addStudent,
  // editStudent,
};

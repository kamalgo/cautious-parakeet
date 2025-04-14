const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const fileupload = require("express-fileupload");
const bodyParser = require("body-parser");
const multer = require("multer");
const { execFile } = require('child_process'); // Required for running external scripts


const upload = multer({
    dest: "uploads/", // Destination folder for uploaded files
});


const { sequelize } = require("./database/database");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const collegeRoutes = require("./routes/collegeRoutes");
const mahadbtRoutes = require("./routes/mahadbtRoutes");
const uploadRoute = require("./routes/uploadRoute");
const courseRoutes = require("./routes/courseRoutes");
const dropdownRoutes = require("./routes/dropDownRoutes");
const jarRoutes = require("./routes/jarRoutes");
const csvRoutes = require("./routes/csvRoutes1");
const shravaniRoutes = require("../backend/routes/shravaniRoutes");
const studentRoutes = require("../backend/routes/studentsRoutes")
const forstutranchesRoutes = require("../backend/routes/forstuTranchesRoutes");
const ttcollegeRoutes = require("../backend/routes/ttCollegeRoutes");
const forstuCandidates = require("../backend/routes/forstuCandidatesRoutes");
const freshStudentsRoutes = require("../backend/routes/freshStudentsRoutes");
const renewalStudentsRoutes = require("../backend/routes/renewalStudentsRoutes");
const freshStudRoutes = require("../backend/routes/freshStudRoutes");
const auditRoutes = require("../backend/routes/auditRoutes");
const MahaDBT_Registration = require("../backend/routes/MahaDBT_Registration_Routes");
const projectsRoutes = require("../backend/routes/projects.routes");

dotenv.config();
// comment
const app = express();

sequelize
  .authenticate()
  .then(() => {
    console.log("Database Connection Estabalished.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

app.use(cors());
app.use(morgan("tiny"));
// app.use(fileupload());
app.use(fileupload({
  limits: { fileSize: 50 * 1024 * 1024 }, // Set limit to 50MB
}));

// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true })); // Limits URL-encoded request size to 10MB


// parse application/json
// app.use(bodyParser.json());
app.use(bodyParser.json({ limit: '10mb' })); // Limits JSON request size to 10MB
app.use(bodyParser.text({ type: "text/html" }));

app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", collegeRoutes);
app.use("/api", mahadbtRoutes);
app.use("/api", uploadRoute);
app.use("/api", courseRoutes);
app.use("/api", dropdownRoutes);
app.use("/api", jarRoutes);
app.use("/api", shravaniRoutes);
app.use("/api", studentRoutes);
app.use("/api", forstutranchesRoutes);
app.use("/api", ttcollegeRoutes);
app.use("/api", forstuCandidates);
app.use("/api", freshStudentsRoutes);
app.use("/api", renewalStudentsRoutes);
app.use("/api", freshStudRoutes);
app.use("/api", auditRoutes);
app.use("/api", MahaDBT_Registration);
app.use("/api/projects", projectsRoutes);


// app.js or index.js

// Call the function to execute the stored procedure
// executeStoredProcedure();

app.get("/", (req, res) => {
  res.send("Hello World");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server in Running 🏃🏻 on port ${PORT}!`));


// Import and run the polling script
require('../backend/Polling');
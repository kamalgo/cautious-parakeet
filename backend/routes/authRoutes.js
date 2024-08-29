const express = require("express");

// const {
//   signup,
//   signin,
//   getApiData,
//   changePassword,
//   isSignedIn,
//   verifyToken,
// } = require("../controllers/authController");

const {
  signUpValidationSchema,
  signInValidationSchema,
  changePasswordValidationSchema,
} = require("../helpers/validation");
const { signup, signin } = require("../controllers/authController");

const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.post("/signup", signUpValidationSchema, signup);

router.post("/signin", signInValidationSchema, signin);

// router.put(
//   "/changePassword",
//   isSignedIn,
//   changePasswordValidationSchema,
//   changePassword
// );

// router.post("/verify", verifyToken);

module.exports = router;

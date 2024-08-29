const express = require("express");
const {
  getAllUsers,
  getUserProfile,
  getUser,
  addUser,
  deleteUser,
  deleteUsers,
  // updateUser,
  // getAllUsersByRole,
  // getUserCountByRole,
  // getrecentUsers,
  // deleteUsers,
} = require("../controllers/usersController");

const { isSignedIn, isAdmin, isCollege } = require("../controllers/authController");
const {
  getUserValidationSchema,
  deleteUserValidationSchema,
  UsersValidationSchemaForIds,
  // addUserValidationSchema,
  // updateUserValidationSchema,
  // deleteUserValidationSchema,
  // globalRoleValidation,
} = require("../helpers/validation");

const router = express.Router();

router.get("/users", isSignedIn, isAdmin, getAllUsers);

router.get("/user", isSignedIn, isAdmin, getUserValidationSchema, getUser);

// router.get(
//   "/userByRole",
//   isSignedIn,
//   isAdmin,
//   globalRoleValidation,
//   getAllUsersByRole
// );

// router.get("/user/recent", isSignedIn, isAdmin, getrecentUsers);

router.post("/user", isSignedIn, isAdmin, addUser, isCollege);

// router.put(
//   "/user",
//   isSignedIn,
//   isAdmin,
//   updateUserValidationSchema,
//   updateUser
// );

router.delete(
  "/user",
  isSignedIn,
  isAdmin,
  deleteUserValidationSchema,
  deleteUser,
  isCollege
);

router.delete(
  "/users",
  isSignedIn,
  isAdmin,
  UsersValidationSchemaForIds,
  deleteUsers,
  isCollege
);

router.get("/profile", isSignedIn, getUserProfile);

// router.get("/getUserCountByRole", isSignedIn, isAdmin, getUserCountByRole);

module.exports = router;

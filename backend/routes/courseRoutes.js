const express = require("express");
const {
  getAllCoursesList
  // addUser,
  // deleteUser,
  // updateUser,
  // getAllUsersByRole,
  // getUserCountByRole,
  // getrecentUsers,
  // deleteUsers,
} = require("../controllers/courseController");

const { isSignedIn, isAdmin } = require("../controllers/authController");
// const {
//   getUserValidationSchema,
//   // addUserValidationSchema,
//   // updateUserValidationSchema,
//   // deleteUserValidationSchema,
//   // globalRoleValidation,
//   // UsersValidationSchemaForIds,
// } = require("../helpers/validation");

const router = express.Router();

router.get("/getallcourselist", getAllCoursesList);





// router.delete("/deletecollegeProfile", isSignedIn, isAdmin, getUserValidationSchema, deleteCollegeProfile);






// router.get(
//   "/userByRole",
//   isSignedIn,
//   isAdmin,
//   globalRoleValidation,
//   getAllUsersByRole
// );

// router.get("/user/recent", isSignedIn, isAdmin, getrecentUsers);

// router.post("/user", isSignedIn, isAdmin, addUserValidationSchema, addUser);

// router.put(
//   "/user",
//   isSignedIn,
//   isAdmin,
//   updateUserValidationSchema,
//   updateUser
// );

// router.delete(
//   "/user",
//   isSignedIn,
//   isAdmin,
//   deleteUserValidationSchema,
//   deleteUser
// );

// router.delete(
//   "/users",
//   isSignedIn,
//   isAdmin,
//   UsersValidationSchemaForIds,
//   deleteUsers
// );

// router.get("/profile", isSignedIn, getUserProfile);

// router.get("/getUserCountByRole", isSignedIn, isAdmin, getUserCountByRole);

module.exports = router;

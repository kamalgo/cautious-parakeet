const express = require("express");
const {
  getAllCollegeProfile,
  // getCollegeProfile,
  // getSingleCollegeProfile,
  addCollegeProfile,
  updateCollegeProfile,
  deleteCollegeProfile,
  getQualificationlevel,
  getStramlevel,
  addQualification_Stream,
  updateQualification_Stream,
  deleteQualification_Stream,
  getQualificationInfoByCollegeId
  // addUser,
  // deleteUser,
  // updateUser,
  // getAllUsersByRole,
  // getUserCountByRole,
  // getrecentUsers,
  // deleteUsers,
} = require("../controllers/collegeController");

const { isSignedIn, isAdmin, isCollege } = require("../controllers/authController");
// const {
//   getUserValidationSchema,
//   // addUserValidationSchema,
//   // updateUserValidationSchema,
//   // deleteUserValidationSchema,
//   // globalRoleValidation,
//   // UsersValidationSchemaForIds,
// } = require("../helpers/validation");

const router = express.Router();

router.get("/getAllCollegeProfiles", isSignedIn, isAdmin, isCollege, getAllCollegeProfile, );

// router.get("/getCollegeProfile", isSignedIn, isAdmin, getUserValidationSchema, getCollegeProfile);

// router.get("/getSingleCollegeProfile/id", getSingleCollegeProfile);

router.post("/createNewCollegeProfile", isSignedIn, isAdmin, isCollege, addCollegeProfile);

router.put("/updatecollegeProfile", isSignedIn, isAdmin, isCollege, updateCollegeProfile);

router.delete("/deletecollegeProfile", isSignedIn, isAdmin, isCollege, deleteCollegeProfile);

router.get("/getqualificationlevel", getQualificationlevel);
router.get("/getstreamlevel", getStramlevel);

router.post("/addqualificationinfo",isSignedIn, addQualification_Stream);

router.put("/updatequalificationinfo",isSignedIn, updateQualification_Stream);

router.delete("/deletequalificationinfo", isSignedIn, deleteQualification_Stream);

router.get("/getAllQualificationinfo", isSignedIn, isAdmin, isCollege, getQualificationInfoByCollegeId);

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

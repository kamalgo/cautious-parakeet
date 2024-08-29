const express = require("express");
const {
  getListOfMaritalStatus,
  getListOfReligions,
  getListOfCasteCatogory,
  getListdisabilitytype,
  getListdisabilitywithtype,
  getListofOccupation,
  getListofHostelType,
  getListofQualificationLevel,
  getListofyearOfStudy,
  getListofSSCadmissionYear,
  getListofHSCadmissionYear,
  getSSCExamMonth,
  getHSCExamMonth
} = require("../controllers/dropDownController");

// const { isSignedIn, isAdmin } = require("../controllers/authController");
// const {
//   getUserValidationSchema,
//   // addUserValidationSchema,
//   // updateUserValidationSchema,
//   // deleteUserValidationSchema,
//   // globalRoleValidation,
//   // UsersValidationSchemaForIds,
// } = require("../helpers/validation");

const router = express.Router();

router.get("/getmaritalstatus", getListOfMaritalStatus);
router.get("/getreligionlist", getListOfReligions);
router.get("/getcastecatogorylist", getListOfCasteCatogory);
router.get("/getdisabilitytypelist", getListdisabilitytype);
router.get("/getdisabilitywithtypelist", getListdisabilitywithtype);
router.get("/getoccpationlist", getListofOccupation);
router.get("/gethosteltype", getListofHostelType);
router.get("/getqualificationlevellist", getListofQualificationLevel);
router.get("/getyearofstudyllist", getListofyearOfStudy);
router.get("/getsscadmissionyear", getListofSSCadmissionYear);
router.get("/gethscadmissionyear", getListofHSCadmissionYear);
router.get("/getsscexammonth", getSSCExamMonth);
router.get("/gethscexammonth", getHSCExamMonth);





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

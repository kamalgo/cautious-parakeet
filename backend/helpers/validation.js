const { body } = require("express-validator");
const ROLES = require("./roles");

const signUpValidationSchema = [
  body("username")
    .isAlpha()
    .withMessage("username should only contain alphabets")
    .notEmpty()
    .withMessage("username should not be empty")
    .isLength({ max: 15, min: 3 })
    .withMessage("username should be between 3 - 15 characters"),
  body("email")
    .isEmail()
    .withMessage("Invalid email")
    .notEmpty()
    .withMessage("email should not be empty"),
  body("password")
    .notEmpty()
    .withMessage("Password should not be empty")
    .isLength({ max: 15, min: 6 })
    .withMessage("Password should be between 6 - 15 characters"),
  body("role")
    .isAlpha()
    .withMessage("Role should only contain alphabets")
    .notEmpty()
    .withMessage("Role should not be empty")
    .isUppercase()
    .withMessage("Invalid Role")
    .custom((value) => {
      value = value.toUpperCase();
      if (ROLES.DB_ROLE_ENUM.includes(value)) {
        return true;
      } else {
        throw new Error("Invalid Role!");
      }
    }),
];

const signInValidationSchema = [
  body("username")
    .notEmpty()
    .withMessage("username should not be empty")
    .isLength({ max: 15, min: 3 })
    .withMessage("username should be between 3 - 15 characters"),
  body("password")
    .notEmpty()
    .withMessage("Password should not be empty")
    .isLength({ max: 15, min: 6 })
    .withMessage("Password should be between 6 - 15 characters"),
];

const changePasswordValidationSchema = [
  body("prevPassword")
    .notEmpty()
    .withMessage("Previous password should not be empty")
    .isLength({ max: 15, min: 6 })
    .withMessage("Previous password should be between 6 - 15 characters"),
  body("newPassword")
    .notEmpty()
    .withMessage("New password should not be empty")
    .isLength({ max: 15, min: 6 })
    .withMessage("New password should be between 6 - 15 characters"),
];

const getUserValidationSchema = [
  body("id")
    .notEmpty()
    .withMessage("ID should not be empty")
    .isNumeric()
    .withMessage("ID should be a number")
    .custom((value) => {
      if (value > 0) {
        return true;
      } else {
        throw new Error("Invalid ID!");
      }
    }),
];

const addUserValidationSchema = [
  body("username")
    .notEmpty()
    .withMessage("username should not be empty")
    .isAlphanumeric()
    .withMessage("username should only contain alphabets and numbers")
    .isLength({ max: 15, min: 3 })
    .withMessage("username should be between 3 - 15 characters"),
  body("password")
    .notEmpty()
    .withMessage("Password should not be empty")
    .isLength({ max: 15, min: 6 })
    .withMessage("Password should be between 6 - 15 characters"),
  body("role")
    .notEmpty()
    .withMessage("Role should not be empty")
    .isAlpha()
    .withMessage("Role should only contain alphabets")
    .isUppercase()
    .withMessage("Invalid Role")
    .custom((value) => {
      value = value.toUpperCase();
      if (ROLES.DB_ROLE_ENUM.includes(value)) {
        return true;
      } else {
        throw new Error("Invalid Role!");
      }
    }),
];

const UsersValidationSchemaForIds = [
  body("Ids").isArray({ min: 1 }).withMessage("Please select min one item"),
];

const deleteUserValidationSchema = [
  body("id")
    .notEmpty()
    .withMessage("ID should not be empty")
    .isNumeric()
    .withMessage("ID should be a number")
    .custom((value) => {
      if (value > 0) {
        return true;
      } else {
        throw new Error("Invalid ID!");
      }
    }),
];

const updateUserValidationSchema = [
  body("id")
    .notEmpty()
    .withMessage("ID should not be empty")
    .isNumeric()
    .withMessage("ID should be a number")
    .custom((value) => {
      if (value > 0) {
        return true;
      } else {
        throw new Error("Invalid ID!");
      }
    }),
  body("username")
    .notEmpty()
    .withMessage("username should not be empty")
    .isLength({ max: 15, min: 3 })
    .withMessage("username should be between 3 - 15 characters"),
  body("role")
    .notEmpty()
    .withMessage("Role should not be empty")
    .isUppercase()
    .withMessage("Invalid Role")
    .custom((value) => {
      value = value.toUpperCase();
      if (ROLES.DB_ROLE_ENUM.includes(value)) {
        return true;
      } else {
        throw new Error("Invalid Role!");
      }
    }),
];

module.exports = {
  signUpValidationSchema,
  signInValidationSchema,
  getUserValidationSchema,
  addUserValidationSchema,
  updateUserValidationSchema,
  deleteUserValidationSchema,
  changePasswordValidationSchema,
  UsersValidationSchemaForIds,
};

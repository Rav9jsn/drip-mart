const express = require("express");

const authRouter = express.Router();
const authController = require("../Controller/authController");
const {
  signupValidation,
  validationCheck,
} = require("../middleware/authMiddleware");

authRouter.post(
  "/signup",
  signupValidation,
  validationCheck,
  authController.CreateAccount
);
authRouter.post(
  "/login",
  authController.loggedAccount
);

module.exports = authRouter;

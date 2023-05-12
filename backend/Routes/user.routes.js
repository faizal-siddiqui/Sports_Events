const express = require("express");
const { UserModel } = require("../Model/user.model");
const jwt = require("jsonwebtoken");
const userMiddleware = require("../Middleware/user.middleware");
const userController = require("../Controller/user.controller");

const userRouter = express.Router();

userRouter.post(
  "/register",
  [userMiddleware.userAlreadyExist, userMiddleware.hashPassword],
  userController.registerUser
);

userRouter.post(
  "/login",
  [userMiddleware.authenticateUser],
  userController.loginUser
);

module.exports = { userRouter };

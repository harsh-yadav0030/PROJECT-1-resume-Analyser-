import { Router } from "express";

import {
  registerUser,
  loginUser,
  logoutUser,
  getProfile,
} from "../controller/auth.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";

const authRouter = Router();

/**
 * @route POST /api/auth/register
 * @description register a new user with username, email and password
 * @access public
 */
authRouter.post("/register", registerUser);

/**
 * @route POST /api/auth/login
 * @description login user with email and password
 * @access public
 */
authRouter.post("/login", loginUser);

/**
 * @route POST /api/auth/logout
 * @description clear token from user cookie and add the token in blacklist
 * @access public
 */
authRouter.post("/logout", logoutUser);

/**
 * @route GET /api/auth/profile
 * @description fetch token from the cookie verify it and fetch details from database
 * @access private
 */
authRouter.get("/profile", authMiddleware, getProfile);

export default authRouter;
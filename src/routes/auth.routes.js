import { Router } from "express";
import {registerUser, loginUser,logoutUser ,getProfile} from "../controller/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const authRouter = Router();
authRouter.post("/register", registerUser);

/**
 * @route POST /Api/auth/login
 * @description login user with email and password
 * @access public
 */
authRouter.post("/login", loginUser);

/**
 * @route Get /Api/auth/logout
 * @description clear token from user cookie and add the token in blacklist
 * @access public
 */
authRouter.get("/logout", logoutUser);

/**
 * @route Get /Api/auth/profile
 * @description fetch roken from the cookie verify it and fetch details from database
 * @access private 
 */

authRouter.get("/profile",authMiddleware,getProfile);

export default authRouter;
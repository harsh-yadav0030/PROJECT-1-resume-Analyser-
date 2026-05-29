import { Router } from "express";

import {registerUser, loginUser,logoutUser} from "../controller/auth.controller.js";

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

export default authRouter;
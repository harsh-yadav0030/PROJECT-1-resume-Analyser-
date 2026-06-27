import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import {asyncHandler} from "../utils/asynchandler.js"
import dotenv from "dotenv";

dotenv.config();

// console.log("ACCESS_TOKEN_EXPIRY:", process.env.ACCESS_TOKEN_EXPIRY);
// console.log("REFRESH_TOKEN_EXPIRY:", process.env.REFRESH_TOKEN_EXPIRY);

const generateAccessAndRefreshTokens = async (userId) => {
    const user = await User.findById(userId);

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;

    await user.save({
        validateBeforeSave: false,
    });

    return {
        accessToken,
        refreshToken,
    };
};

const registerUser = asyncHandler (async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        throw new ApiError(
            400,
            "Please provide username, email and password correctly"
        );
    }

    const isUserAlreadyExist = await User.findOne({
        $or: [{ username }, { email }],
    });

    if (isUserAlreadyExist) {
        throw new ApiError(409, "User already exists");
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
        username,
        email,
        password: hash,
    });

    return res.status(201).json(
        new ApiResponse(
            201,
            {
                id: user._id,
                username: user.username,
                email: user.email,
            },
            "User registered successfully"
        )
    );
});

const loginUser = asyncHandler (async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(404, "User does not exist");
    }

    const isPasswordValid = await bcrypt.compare(
        password,
        user.password
    );

    if (!isPasswordValid) {
        throw new ApiError(401, "Incorrect password");
    }

    const {accessToken,refreshToken}=await generateAccessAndRefreshTokens(user._id);

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",//developmenet phase we want it false;
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // Prevents cookies from being sent with cross-site requests (helps protect against CSRF). 
        };

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                },
                "User logged in successfully"
            )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    user.refreshToken = null;

    await user.save({
        validateBeforeSave: false,
    });

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
       sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // Prevents cookies from being sent with cross-site requests (helps protect against CSRF). 
    };

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(
            new ApiResponse(
                200,
                {},
                "User logged out successfully"
            )
        );
});

const getProfile = asyncHandler(async (req, res) => {
    return res.status(200).json(
        new ApiResponse(
            200,
            req.user,
            "Profile fetched successfully"
        )
    );
});


// token comes and check token
// verify token by decoding 
// fetch user using id in token
// verify the refresh TOken 
//generate new refresh TOken

const refreshAccessToken = asyncHandler(async (req, res) => {
    const token = req.cookies?.refreshToken;

    if (!token) {
        throw new ApiError(401, "Unauthorized request");
    }

    let decodedToken;

    try {
        decodedToken = jwt.verify(
            token,
            process.env.REFRESH_TOKEN_SECRET
        );
    } catch (error) {
        throw new ApiError(401, "Invalid or expired refresh token");
    }

    const user = await User.findById(decodedToken._id);

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    if (token !== user.refreshToken) {
        throw new ApiError(401, "Invalid or expired refresh token");
    }

    const { accessToken, refreshToken } =
        await generateAccessAndRefreshTokens(user._id);

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // Prevents cookies from being sent with cross-site requests (helps protect against CSRF). 
    };

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                },
                "Access token refreshed successfully"
            )
        );
});

export {
    registerUser,
    loginUser,
    logoutUser,
    getProfile,
    refreshAccessToken
};
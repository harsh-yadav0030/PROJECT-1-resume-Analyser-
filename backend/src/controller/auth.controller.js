import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { User } from "../models/user.model.js";
import BlacklistTokenModel from "../models/blacklist.model.js";

const registerUser = async (req, res) => {
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

    const token = jwt.sign(
        {
            _id: user._id,
            username: user.username,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    );

    res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        maxAge: 24 * 60 * 60 * 1000,
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
};

const loginUser = async (req, res) => {
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

    const token = jwt.sign(
        {
            _id: user._id,
            username: user.username,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    );

    res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json(
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
};

const logoutUser = async (req, res) => {
    const token = req.cookies?.token;

    if (token) {
        await BlacklistTokenModel.create({
            token,
        });
    }

    res.clearCookie("token");

    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "User logged out successfully"
        )
    );
};

const getProfile = async (req, res) => {
    return res.status(200).json(
        new ApiResponse(
            200,
            req.user,
            "Profile fetched successfully"
        )
    );
};

export {
    registerUser,
    loginUser,
    logoutUser,
    getProfile,
};
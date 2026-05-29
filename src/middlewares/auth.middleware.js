import jwt from "jsonwebtoken";
import BlacklistTokenModel from "../models/blacklist.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";

const authMiddleware = async (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) {
    throw new ApiError(401, "Invalid token");
  }

  const blacklisted = await BlacklistTokenModel.findOne({ token });

  if (blacklisted) {
    throw new ApiError(401, "Token blacklisted");
  }

  try {
    const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
    );
    const user= await User.findById(decoded._id)
        .select("-password");

    req.user=user;    
    next();

  } catch (error) {

    throw new ApiError(401, "Invalid or expired token");
    
  }
};

export {authMiddleware};
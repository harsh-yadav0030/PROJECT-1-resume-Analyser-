import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: [true, "Username already exists"],
      required: [true, "Username is required"],
    },
    email: {
      type: String,
      unique: [true, "Email already used"],
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    pdfGenerationCount: {
      type: Number,
      default: 0,
    },
    pdfCountResetDate: {
      type: Date,
      default: Date.now,
    },
    reportGenerationCount: {
      type: Number,
      default: 0,
    },
    reportCountResetDate: {
      type: Date,
      default: Date.now,
    },
    refreshToken:{
      type:String,
      default: null
    }
  },
  {
    timestamps: true,
  },
);

userSchema.methods.generateAccessToken = function(){
   return jwt.sign(
    {
      _id:this._id,
      username:this.username
    },
      process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
   )
}

userSchema.methods.generateRefreshToken = function(){
   return jwt.sign(
    {
      _id:this._id,
      username:this.username
    },
      process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    }
   )
}

const User = mongoose.model("User", userSchema);

export { User };

import mongoose from "mongoose";

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
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);

export  {User};
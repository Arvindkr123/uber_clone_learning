import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import dotenvConfig from "../config/dotenv.config.js";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      firstname: {
        type: String,
        required: true,
        minlength: [3, "First name must be at least 3 characters long"],
      },
      lastname: {
        type: String,
        minlength: [3, "Last name must be at least 3 characters long"],
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      minlength: [5, "Email must be at least 5 characters long"],
      validate: {
        validator: function (email) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(email);
        },
        message: "Invalid email format",
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    socketId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Generate authentication token
userSchema.methods.generateAuthToken = function () {
  if (!dotenvConfig.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }
  return jwt.sign({ _id: this._id }, dotenvConfig.JWT_SECRET, {
    expiresIn: "24h",
  });
};

// Define hashPassword as a static method
userSchema.statics.hashPassword = async function (password) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

// Compare password instance method
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const UserModel = mongoose.model("User", userSchema);
export default UserModel;

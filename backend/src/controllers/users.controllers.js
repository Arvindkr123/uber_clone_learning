import { validationResult } from "express-validator";
import UserModel from "../models/users.models.js";
import UserService from "../services/users.services.js";
import blackListTokenModels from "../models/blackListToken.models.js";




const registerUser = async (req, res, next) => {
  try {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    // Extract user data
    const { fullname, email, password } = req.body;
    const firstname = fullname?.firstname || "";
    const lastname = fullname?.lastname || "";
    if (!firstname || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "First name, email, and password are required.",
      });
    }

    const existsUser = await UserModel.findOne({ email });
    if (existsUser) {
      return res.status(400).json({
        success: false,
        message: "This user already exists",
      });
    }

    // Hash the password
    const hashedPassword = await UserModel.hashPassword(password);

    // Create the user
    const user = await UserService.createUser({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });

    if (!user) {
      return res.status(500).json({
        success: false,
        message: "Failed to create user. Please try again.",
      });
    }

    // Generate authentication token
    const token = user.generateAuthToken();

    // Respond with user and token
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: {
        _id: user._id,
        email: user.email,
        fullname: user.fullname,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    console.error("Error while registering user:", error);
    res.status(500).json({
      success: false,
      message: "Error while registering user",
      error: error.message,
    });
  }
};

const loginUser = async (req, res, next) => {
  try {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }


    // Extract user data
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "email, and password are required.",
      });
    }

    const user = await UserModel.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        message: 'Invalid email and password'
      })
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        message: 'Invalid email and password'
      })
    }

    const token = user.generateAuthToken();

    res.cookie('token', token);


    res.status(200).json({
      user, token
    });


  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error while logging in user",
      error: error.message,
    })
  }
}


const getUserProfile = async (req, res, next) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while fetching user profile",
      error: error.message,
    })
  }
}
const logoutUser = async (req, res, next) => {
  try {
    // Get token BEFORE clearing the cookie
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

    // Clear token cookie
    res.clearCookie('token');

    // Save to blacklist if token exists
    if (token) {
      await blackListTokenModels.create({ token });
    }

    res.status(200).json({
      message: 'User logged out successfully',
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while logging out user",
      error: error.message,
    });
  }
};

export default {
  registerUser,
  loginUser,
  getUserProfile,
  logoutUser
};

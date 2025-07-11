import jwt from 'jsonwebtoken';
import envConfig from "../config/dotenv.config.js";
import UserModel from '../models/users.models.js';
import blackListTokenModels from '../models/blackListToken.models.js';
import CaptionModel from '../models/captan.models.js';

export const authUser = async (req, res, next) => {
    try {
        // Extract token from either cookie or Authorization header
        const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Unauthorized access: No token provided" });
        }

        // Check if token is blacklisted
        const blacklisted = await blackListTokenModels.findOne({ token });
        if (blacklisted) {
            return res.status(401).json({ message: "Unauthorized access: Token blacklisted" });
        }

        // Verify JWT token
        const decoded = jwt.verify(token, envConfig.JWT_SECRET);

        // Retrieve user from DB
        const user = await UserModel.findById(decoded._id);
        if (!user) {
            return res.status(401).json({ message: "Unauthorized access: User not found" });
        }

        req.user = user;
        next(); // Proceed to next middleware
    } catch (error) {
        console.error("JWT Auth Error:", error);
        return res.status(401).json({ message: "Unauthorized access: Invalid or expired token" });
    }
};


export const authCaption = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: "Unauthorized access: No token provided" });
        }

        // Check if token is blacklisted
        const blacklisted = await blackListTokenModels.findOne({ token });
        if (blacklisted) {
            return res.status(401).json({ message: "Unauthorized access: Token blacklisted" });
        }

        // 🔒 Verify token inside try/catch
        let decoded;
        try {
            decoded = jwt.verify(token, envConfig.JWT_SECRET);
        } catch (err) {
            return res.status(401).json({ message: "Invalid or malformed token", error: err.message });
        }

        // 🧑‍💻 Fetch user
        const caption = await CaptionModel.findById(decoded._id);
        if (!caption) {
            return res.status(401).json({ message: "Unauthorized access: caption not found" });
        }

        req.caption = caption;
        next();
    } catch (err) {
        console.error("Auth middleware error:", err);
        res.status(500).json({ message: "Server error during authentication", error: err.message });
    }
};

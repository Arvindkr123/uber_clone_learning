import jwt from 'jsonwebtoken';
import envConfig from "../config/dotenv.config.js";
import UserModel from '../models/users.models.js';
import blackListTokenModels from '../models/blackListToken.models.js';

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

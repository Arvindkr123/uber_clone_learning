import { validationResult } from "express-validator"
import CaptionModel from "../models/captan.models.js";
import captionService from "../services/caption.service.js";
import blackListTokenModels from "../models/blackListToken.models.js";

const registerCaptionnController = async (req, res, next) => {
    console.log("Incoming request body:", req.body)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("Validation errors:", errors.array());
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { fullname, email, password, vehicle } = req.body;
        const hashPassword = await CaptionModel.hashPassword(password);

        const isCaptionAlreadyExists = await CaptionModel.findOne({ email });
        if (isCaptionAlreadyExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const caption = await captionService.createCaption({
            fullname: {
                firstname: fullname.firstname,
                lastname: fullname.lastname
            },
            email,
            password: hashPassword,
            vehicle: {
                color: vehicle.color,
                plate: vehicle.plate,
                capacity: vehicle.capacity,
                vehicleType: vehicle.vehicleType
            }
        });

        const token = caption.generateAuthToken();
        res.status(201).json({ token, caption });
    } catch (error) {
        console.error("Registration failed:", error);
        res.status(500).json({ message: 'Server error during registration' });
    }
};

const loginCaption = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body;
    const caption = await CaptionModel.findOne({ email }).select("+password");
    if (!caption) {
        return res.status(401).json({
            message: 'Invalid email or password'
        })
    }

    const isMatch = await caption.comparePassword(password);
    if (!isMatch) {
        return res.status(401).json({
            message: 'Invalid email or password'
        })
    }

    const token = caption.generateAuthToken();

    res.cookie('token', token)

    res.status(200).json({
        token, caption
    })

}

const getCaptionProfile = async (req, res, next) => {
    res.status(200).json({
        caption: req.caption
    })
}
const logoutCaption = async (req, res, next) => {
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
            message: 'Caption logged out successfully',
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while logging out caption",
            error: error.message,
        });
    }
}


export default {
    registerCaptionnController,
    loginCaption,
    getCaptionProfile,
    logoutCaption
}
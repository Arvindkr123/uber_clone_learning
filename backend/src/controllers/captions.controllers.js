import { validationResult } from "express-validator"
import CaptionModel from "../models/captan.models.js";
import captionService from "../services/caption.service.js";

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


export default {
    registerCaptionnController
}
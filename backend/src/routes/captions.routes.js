import { Router } from "express";
import { body } from "express-validator";
import { authUser } from "../middlewares/auth.middleware.js";
import captionsControllers from "../controllers/captions.controllers.js";

const router = Router();

router.post("/register", [
  body("email")
    .isEmail()
    .withMessage("invalid email"),

  body("fullname.firstname")
    .isLength({ min: 3 })
    .withMessage("First name must be at least 3 characters long"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be valid"),

  body("vehicle.color")
    .isLength({ min: 3 })
    .withMessage("color must be at least 3 characters"),

  body("vehicle.plate")
    .isLength({ min: 3 })
    .withMessage("plate must be at least 3 characters"),

  body("vehicle.capacity")
    .isInt({ min: 1 })
    .withMessage("capacity must be at least 1"),

  body("vehicle.vehicleType")
    .isIn(["car", "motorcyle", "auto"])
    .withMessage("invalid"),
], captionsControllers.registerCaptionnController);

export default router;

import { Router } from "express";
import userControllers from "../controllers/users.controllers.js";
import { body } from "express-validator";
import { authUser } from "../middlewares/auth.middleware.js";
const router = Router();

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("invalid email"),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters long"),
    body("password").isLength({ min: 6 }).withMessage("Password must be valid"),
  ],
  userControllers.registerUser
);

router.post("/login", [
  body("email").isEmail().withMessage("invalid email"),
  body("password").isLength({ min: 6 }).withMessage("Password must be valid"),
], userControllers.loginUser);

router.get("/profile", authUser, userControllers.getUserProfile);
router.post("/logout", authUser, userControllers.logoutUser);

export default router;

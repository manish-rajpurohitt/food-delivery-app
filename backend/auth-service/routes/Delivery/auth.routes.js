import express from "express";
import { deliveryAuthController } from "../../controllers/index.js";

const router = express.Router();


router.post("/signup", deliveryAuthController.authController.signup);
router.post("/login", deliveryAuthController.authController.signin);

export default router;
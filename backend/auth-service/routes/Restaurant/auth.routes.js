import express  from "express";
import {restaurantAuthController } from "../../controllers/index.js";
import tokenHekper from "../../services/tokenService.js";

const router = express.Router();

router.post("/signup", restaurantAuthController.authController.signup);
router.post("/login", restaurantAuthController.authController.signin);

export default router;
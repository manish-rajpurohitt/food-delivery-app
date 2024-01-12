import express  from "express";
import {clientAuthController } from "../../controllers/index.js";
import tokenHekper from "../../services/tokenService.js";

const router = express.Router();


router.post("/signup", clientAuthController.authController.signup);
router.post("/login", clientAuthController.authController.signin);

export default router;
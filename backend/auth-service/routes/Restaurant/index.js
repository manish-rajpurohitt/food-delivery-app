import routes from "./auth.routes.js";
import express from "express";

const router = express.Router();
router.use(routes);

export default router;
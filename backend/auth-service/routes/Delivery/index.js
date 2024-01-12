import express from "express"
import routes from "./auth.routes.js"
const router = express.Router();
router.use(routes)
export default router;
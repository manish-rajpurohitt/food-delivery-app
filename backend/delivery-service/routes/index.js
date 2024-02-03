import orderRoutes from "./order.routes.js";
import riderRoutes from "./rider.routes.js";
import express from "express";

const router = express.Router();


router.use("/v1/rider", riderRoutes);
router.use("/v1/order", orderRoutes);

export default router;
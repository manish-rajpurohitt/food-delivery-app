import restaurantRoutes from "./Restaurant/index.js";
import clientRoutes from "./Client/index.js";
import deliveryRoutes from "./Delivery/index.js";
import express from "express";

const router = express.Router();


router.use("/v1/restaurant", restaurantRoutes);
router.use("/v1/delivery", deliveryRoutes);
router.use("/v1/client", clientRoutes);


export default router;
import cartRoutes from "./cart.routes.js";
import clientRoutes from "./client.routes.js";
import orderRoutes from "./order.routes.js";
import restaurantRoutes from "./restaurant.routes.js";
import express from "express";

const router = express.Router();


router.use("/v1/restaurant", restaurantRoutes);
router.use("/v1/order", orderRoutes);
router.use("/v1/client", clientRoutes);
router.use("/v1/cart", cartRoutes);


export default router;
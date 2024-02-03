import express from "express";
import categoryRoutes from "./category.routes.js"
import itemsRoutes from "./items.routes.js"
import restaurantRoutes from "./restaurant.routes.js"

const router = express.Router();

router.use("/v1/restaurant/category", categoryRoutes);
router.use("/v1/restaurant/item", itemsRoutes);
router.use("/v1/restaurant", restaurantRoutes);

export default router;
import express from "express";
import { restaurantTokenHelper } from "common";
import { restaurantController } from "../controllers/index.js";

const router = express.Router();

//private
router.get("/", restaurantTokenHelper.validateUser, restaurantController.getRestaurant);
router.put("/", restaurantTokenHelper.validateUser, restaurantController.updateRestaurant);
router.delete("/", restaurantTokenHelper.validateUser, restaurantController.deleteRestaurant);

//public


export default router;
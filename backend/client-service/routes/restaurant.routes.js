import { clientTokenHelper } from "common";
import express from "express";
import { restaurantController } from "../controllers/index.js"

const router = express.Router();

router.route("/all").get(clientTokenHelper.validateUser, restaurantController.getAllRestaurants);
router.route("/allItems/:id").get(clientTokenHelper.validateUser, restaurantController.getRestaurantItems);
router.route("/:id").get(clientTokenHelper.validateUser);
router.route("/categories").get(clientTokenHelper.validateUser, restaurantController.getRestaurantCategories);
router.route("/category/:id").get(clientTokenHelper.validateUser);
router.route(":restaurantId//items/:categoryId").get(clientTokenHelper.validateUser, restaurantController.getCategoryItems);
router.route("/item/:itemId").get(clientTokenHelper.validateUser, restaurantController.getItemDetails);



export default router;
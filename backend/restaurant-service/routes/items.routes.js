import express from "express";
import { restaurantTokenHelper } from "common";
import { itemsController } from "../controllers/index.js";

const router = express.Router();

//private
router.get("/:categoryId", restaurantTokenHelper.validateUser, itemsController.getItemsByCategoryId);
router.get("/:id", restaurantTokenHelper.validateUser, itemsController.getItem);
router.get("/", restaurantTokenHelper.validateUser, itemsController.getItems);
router.post("/", restaurantTokenHelper.validateUser, itemsController.addItem);
router.put("/:id", restaurantTokenHelper.validateUser, itemsController.updateItem);
router.delete("/:id", restaurantTokenHelper.validateUser, itemsController.deleteItem);

//public


export default router;
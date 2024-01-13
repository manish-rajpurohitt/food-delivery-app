import express from "express";
import { categoryController } from "../controllers/index.js";
import { restaurantTokenHelper } from "common";
const router = express.Router();

//private
router.post("/", restaurantTokenHelper.validateUser, categoryController.addCategory);
router.get("/:id", restaurantTokenHelper.validateUser, categoryController.getCategory);
router.get("/", restaurantTokenHelper.validateUser, categoryController.getAllCategories);
router.put("/:id", restaurantTokenHelper.validateUser, categoryController.updateCategory);
router.delete("/:id", restaurantTokenHelper.validateUser, categoryController.deleteCategory);

//public


export default router;
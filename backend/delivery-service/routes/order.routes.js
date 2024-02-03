import {
    deliveryTokenHelper
} from "common";
import express from "express";

const router = express.Router();

router.route("/all").get(deliveryTokenHelper.validateUser);
router.route("/:id").get(deliveryTokenHelper.validateUser);
router.route("/accept/:id").post(deliveryTokenHelper.validateUser);
router.route("/updateStatus/:id").put(deliveryTokenHelper.validateUser);




export default router;
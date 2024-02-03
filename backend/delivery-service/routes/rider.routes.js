import { deliveryTokenHelper } from "common";
import express from "express";

const router = express.Router();

router.route("/").get(deliveryTokenHelper.validateUser);
router.route("/").put(deliveryTokenHelper.validateUser);
router.route("/setCoordinates").get(deliveryTokenHelper.validateUser);
router.route("/getAddresses").get(deliveryTokenHelper.validateUser);
router.route("/getAddress/:id").get(deliveryTokenHelper.validateUser);
router.route("/updateAddress/:id").put(deliveryTokenHelper.validateUser);
router.route("/deleteAddress/:id").delete(deliveryTokenHelper.validateUser);

export default router;
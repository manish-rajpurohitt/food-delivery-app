import { clientTokenHelper } from "common";
import express from "express";

const router = express.Router();

router.route("/").get(clientTokenHelper.validateUser);
router.route("/").put(clientTokenHelper.validateUser);
router.route("/getAddresses").get(clientTokenHelper.validateUser);
router.route("/getAddress/:id").get(clientTokenHelper.validateUser);
router.route("/updateAddress/:id").put(clientTokenHelper.validateUser);
router.route("/deleteAddress/:id").delete(clientTokenHelper.validateUser);





export default router;
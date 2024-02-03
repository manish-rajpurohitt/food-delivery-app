import { clientTokenHelper } from "common";
import express from "express";

const router = express.Router();

router.route("/").post(clientTokenHelper.validateUser);
router.route("/").get(clientTokenHelper.validateUser);
router.route("/").put(clientTokenHelper.validateUser);
router.route("/").delete(clientTokenHelper.validateUser);

export default router;
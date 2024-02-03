import { clientTokenHelper } from "common";
import express from "express";

const router = express.Router();

router.route("/").post(clientTokenHelper.validateUser);
router.route("/:id").get(clientTokenHelper.validateUser);
router.route("/All").get(clientTokenHelper.validateUser);

export default router;
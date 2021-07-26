import express from "express";
import timesController from "../controllers/time";

const router = express.Router();

router.route("/").post(timesController.addTimesData);
router.route("/").get(timesController.getAllTimes);

export default router;

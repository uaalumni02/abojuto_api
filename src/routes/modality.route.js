import express from "express";
import modalityController from "../controllers/modality";

const router = express.Router();

router.route("/").post(modalityController.addModalityData);
router.route("/").get(modalityController.getAllModalities);

export default router;

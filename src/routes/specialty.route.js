import express from "express";
import specialtyController from "../controllers/specialty";

const router = express.Router();

router.route("/:id").get(specialtyController.getSpecialtyById);

router.route("/").post(specialtyController.addSpecialtyData);
router.route("/").get(specialtyController.getAllSpecialties);

export default router;
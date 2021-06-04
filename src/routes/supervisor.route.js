import express from "express";
import supervisorController from "../controllers/supervisor";

const router = express.Router();

router.route("/:id").get(supervisorController.SearchForSupervisor);

router.route("/").post(supervisorController.addSupervisorData);
router.route("/").get(supervisorController.getAllSupervisors);

export default router;

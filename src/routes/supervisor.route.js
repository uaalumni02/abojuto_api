import express from "express";
import supervisorController from "../controllers/supervisor";

const router = express.Router();

router.route("/").get(supervisorController.searchForSupervisor);

router.route("/").post(supervisorController.addSupervisorData);
router.route("/").get(supervisorController.getAllSupervisors);

router.route("/:id").get(supervisorController.getSupervisorById);

router.post("/login", supervisorController.supervisorLogin);

export default router;

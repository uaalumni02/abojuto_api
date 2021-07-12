import express from "express";
import supervisorController from "../controllers/supervisor";

const router = express.Router();

router.route("/").get(supervisorController.searchForSupervisor);

router.route("/").post(supervisorController.addSupervisorData);
router.route("/").get(supervisorController.getAllSupervisors);


export default router;

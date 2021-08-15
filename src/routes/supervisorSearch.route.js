import express from "express";
import supervisorController from "../controllers/supervisor";

const router = express.Router();

router.route("/").get(supervisorController.searchForSupervisor);


export default router;
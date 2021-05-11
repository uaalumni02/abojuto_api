import express from "express";
import stateController from "../controllers/state";

const router = express.Router();


router

router.route("/").post(stateController.addStateData);


export default router;
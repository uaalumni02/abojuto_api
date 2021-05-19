import express from "express";
import stateController from "../controllers/states";

const router = express.Router();

router
  .route("/:id")
  .delete(stateController.deleteState)
  .get(stateController.getStateById);

router.route("/").post(stateController.addStateData);
router.route("/").get(stateController.getAllStates);

export default router;

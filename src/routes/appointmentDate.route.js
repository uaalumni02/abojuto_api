import express from "express";
import appointmentController from "../controllers/appointments";
const router = express.Router();

router
  .route("/:appointmentDate")
  .get(appointmentController.getAppointmentByDate);

export default router;

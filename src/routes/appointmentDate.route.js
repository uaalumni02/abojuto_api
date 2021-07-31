import express from "express";
import appointmentController from "../controllers/appointments";
const router = express.Router();

router
  .route("/")
  .get(appointmentController.getAppointmentByDate);

export default router;

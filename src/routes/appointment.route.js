import express from "express";
import appointmentController from "../controllers/appointments";
import checkAuth from "../middleware/check-auth";

const router = express.Router();

// router.route("/:id").get(appointmentController.getAppointmentById);

router.route("/").post(checkAuth, appointmentController.addAppointmentData);

router.route("/").get(appointmentController.getAllAppointments);

router
  .route("/:id")
  .get(checkAuth, appointmentController.getAppointmentByUserorCustomer)
  .patch(appointmentController.updateAppointmentById);

export default router;

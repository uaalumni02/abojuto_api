import express from "express";
import appointmentController from "../controllers/appointments";

const router = express.Router();

router.route("/").post(appointmentController.addAppointmentData);

router.route("/").get(appointmentController.getAllAppointments);

router.route("/:id").get(appointmentController.getAppointmentByUserorCustomer);

export default router;
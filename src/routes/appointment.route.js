import express from "express";
import appointmentController from "../controllers/appointments";
import checkAuth from "../middleware/check-auth";

const router = express.Router();

router.route("/:id").get(appointmentController.getAppointmentById);

router.route("/").post(checkAuth, appointmentController.addAppointmentData);

router.route("/").get(appointmentController.getAllAppointments);

router.route("/:id").get(appointmentController.getAppointmentByUserorCustomer);

export default router;

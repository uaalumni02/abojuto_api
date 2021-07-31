import "dotenv/config";

import express from "express";
import cors from "cors";

const app = express();
const { log, error } = console;

const port = process.env.PORT || 3000;

const router = express.Router();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import stateRoutes from "./routes/states.route";
import licenseRoutes from "./routes/license.route";
import modalityRoutes from "./routes/modality.route";
import specialtyRoutes from "./routes/specialty.route";
import supervisorRoutes from "./routes/supervisor.route";
import licenseCategoryRoutes from "./routes/category.route";
import customerCategoryRoutes from "./routes/customer.route";
import timeRoutes from "./routes/time.route";
import appointmentRoutes from "./routes/appointment.route";
import appointmentDateRoutes from "./routes/appointmentDate.route";

router.use("/state", stateRoutes);
router.use("/license", licenseRoutes);
router.use("/modality", modalityRoutes);
router.use("/specialty", specialtyRoutes);
router.use("/supervisor/search", supervisorRoutes);
router.use("/category", licenseCategoryRoutes);
router.use("/customer", customerCategoryRoutes);
router.use("/time", timeRoutes);
router.use("/appointment", appointmentRoutes);
router.use("/appointmentDate", appointmentDateRoutes);

app.use("/api", router);

app.listen(port, () => log("server is running"));
export default app;

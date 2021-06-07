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

router.use("/state", stateRoutes);
router.use("/license", licenseRoutes);
router.use("/modality", modalityRoutes);
router.use("/specialty", specialtyRoutes);
// router.use("/supervisor/state_id", supervisorRoutes);
// router.use("/supervisor/", supervisorRoutes);
router.use("/supervisor/search", supervisorRoutes);


app.use("/api", router);

app.listen(port, () => log("server is running"));
export default app;

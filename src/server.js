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

router.use("/state", stateRoutes);
router.use("/license", licenseRoutes);
router.use("/modality", modalityRoutes);

app.use("/api", router);

app.listen(port, () => log("server is running"));
export default app;

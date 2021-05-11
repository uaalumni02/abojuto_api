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

import stateRoutes from "./routes/state.route";

router.use("/state", stateRoutes);

app.use("/api", router);

app.listen(port, () => log("server is running"));
export default app;

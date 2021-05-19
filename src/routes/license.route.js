import express from "express";
import licenseController from "../controllers/license";

const router = express.Router();

router.route("/:id").get(licenseController.getLicenseById);

router.route("/").post(licenseController.addLicenseData);
router.route("/").get(licenseController.getAllLicense);

export default router;

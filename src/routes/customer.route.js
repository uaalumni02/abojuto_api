import express from "express";
import customerController from "../controllers/customer";

const router = express.Router();

router.route("/").post(customerController.addCustomerData);
router.route("/").get(customerController.getAllCustomers);

export default router;

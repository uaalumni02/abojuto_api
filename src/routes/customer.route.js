import express from "express";
import customerController from "../controllers/customer";

const router = express.Router();

router.route("/:id").get(customerController.getCustomerById);

router.route("/").post(customerController.addCustomerData);
router.route("/").get(customerController.getAllCustomers);

router.post("/login", customerController.userLogin);

export default router;

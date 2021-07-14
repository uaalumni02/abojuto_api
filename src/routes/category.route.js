import express from "express";
import licenseCategoryController from "../controllers/licenseCategory";

const router = express.Router();

router.route("/").post(licenseCategoryController.addCategoryData);
router.route("/").get(licenseCategoryController.getAllCategories);

export default router;

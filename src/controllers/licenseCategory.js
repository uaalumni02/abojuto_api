import * as Response from "../helpers/response/response";
import Errors from "../helpers/constants/constants";
import validator from "../validator/category";
import Query from "../database/queries/category";

class LicenseCategoryController {
  static async addCategoryData(req, res) {
    const categoryData = { ...req.body };
    try {
      const { error } = validator.validate(categoryData);
      if (error) {
        return Response.responseBadRequest(res, Errors.VALIDATION);
      }
      const categoryInfo = await Query.addLicenseCategory(categoryData);
      return Response.responseOkCreated(res, categoryInfo);
    } catch (err) {
      return Response.responseServerError(res);
    }
  }
  static async getAllCategories(req, res) {
    try {
      const AllCategories = await Query.getCategories(req);
      return Response.responseOk(res, AllCategories);
    } catch (error) {
        console.log(error)
      return Response.responseServerError(res);
    }
  }
}

export default LicenseCategoryController;

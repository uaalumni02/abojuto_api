import * as Response from "../helpers/response/response";
import Errors from "../helpers/constants/constants";
import validator from "../validator/license";
import Query from "../database/queries/license";

class LicenseController {
  static async addLicenseData(req, res) {
    const licenseData = { ...req.body };
    try {
      const { error } = validator.validate(licenseData);
      if (error) {
        return Response.responseBadRequest(res, Errors.VALIDATION);
      }
      const licenseInfo = await Query.addLicense(licenseData);
      return Response.responseOkCreated(res, licenseInfo);
    } catch (err) {
      return Response.responseServerError(res);
    }
  }
  static async getAllLicense(req, res) {
    try {
      const getAllLicense = await Query.getLicense(req);
      return Response.responseOk(res, getAllLicense);
    } catch (error) {
      return Response.responseServerError(res);
    }
  }
  static async getLicenseById(req, res) {
    const { id } = req.params;
    try {
      const { error } = validator.validate({ id });
      if (error) {
        return Response.responseValidationError(res, Errors.INVALID_ID);
      }
      const licenseById = await Query.licenseById(id);
      return licenseById.length == 0
        ? Response.responseNotFound(res, Errors.INVALID_MOVIE)
        : Response.responseOk(res, licenseById);
    } catch (error) {
      return Response.responseServerError(res);
    }
  }
}

export default LicenseController;

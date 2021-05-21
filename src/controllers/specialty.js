import * as Response from "../helpers/response/response";
import Errors from "../helpers/constants/constants";
import validator from "../validator/specialty";
import Query from "../database/queries/specialty";

class SpecialtyController {
  static async addSpecialtyData(req, res) {
    const specialtyData = { ...req.body };
    try {
      const { error } = validator.validate(specialtyData);
      if (error) {
        return Response.responseBadRequest(res, Errors.VALIDATION);
      }
      const specialtyInfo = await Query.addSpecialty(specialtyData);
      return Response.responseOkCreated(res, specialtyInfo);
    } catch (err) {
      return Response.responseServerError(res);
    }
  }
  static async getAllSpecialties(req, res) {
    try {
      const getAllSpecialties = await Query.getAllSpecialties(req);
      return Response.responseOk(res, getAllSpecialties);
    } catch (error) {
      return Response.responseServerError(res);
    }
  }
  static async getSpecialtyById(req, res) {
    const { id } = req.params;
    try {
      const { error } = validator.validate({ id });
      if (error) {
        return Response.responseValidationError(res, Errors.INVALID_ID);
      }
      const specialtyById = await Query.specialtyById(id);
      return specialtyById.length == 0
        ? Response.responseNotFound(res, Errors.INVALID_DATA)
        : Response.responseOk(res, specialtyById);
    } catch (error) {
      return Response.responseServerError(res);
    }
  }
}

export default SpecialtyController;

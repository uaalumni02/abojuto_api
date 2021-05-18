import * as Response from "../helpers/response/response";
import Errors from "../helpers/constants/constants";
import validator from "../validator/modality";
import Query from "../database/queries/modality";

class ModalityController {
  static async addModalityData(req, res) {
    const modalityData = { ...req.body };
    try {
      const { error } = validator.validate(modalityData);
      if (error) {
        return Response.responseBadRequest(res, Errors.VALIDATION);
      }
      const modalityInfo = await Query.addModality(modalityData);
      return Response.responseOkCreated(res, modalityInfo);
    } catch (err) {
      return Response.responseServerError(res);
    }
  }
  static async getAllModalities(req, res) {
    try {
      const getAllModalities = await Query.getModalities(req);
      return Response.responseOk(res, getAllModalities);
    } catch (error) {
      return Response.responseServerError(res);
    }
  }
}

export default ModalityController;

import * as Response from "../helpers/response/response";
import Errors from "../helpers/constants/constants";
import validator from "../validator/time";
import Query from "../database/queries/time";

class TimesController {
  static async addTimesData(req, res) {
    const timesData = { ...req.body };
    try {
      const { error } = validator.validate(timesData);
      if (error) {
        return Response.responseBadRequest(res, Errors.VALIDATION);
      }
      const timesInfo = await Query.addTimes(timesData);
      return Response.responseOkCreated(res, timesInfo);
    } catch (err) {
      return Response.responseServerError(res);
    }
  }
  static async getAllTimes(req, res) {
    try {
      const getAllLicense = await Query.getTimes(req);
      return Response.responseOk(res, getAllLicense);
    } catch (error) {
      return Response.responseServerError;
    }
  }
}

export default TimesController;

import * as Response from "../helpers/response/response";
import Errors from "../helpers/constants/constants";
import validator from "../validator/states";
import Query from "../database/queries/query";

//add some tests
class StateController {
  static async addStateData(req, res) {
    const stateData = { ...req.body };
    try {
      const { error } = validator.validate(stateData);
      if (error) {
        return Response.responseBadRequest(res, Errors.VALIDATION);
      }
      const stateInfo = await Query.addState(stateData);
      return Response.responseOkCreated(res, stateInfo);
    } catch (err) {
      return Response.responseServerError(res);
    }
  }
  static async getAllStates(req, res) {
    try {
      const getAllStates = await Query.getStates(req);
      return Response.responseOk(res, getAllStates);
    } catch (error) {
      return Response.responseServerError(res);
    }
  }
  static async deleteState(req, res) {
    const { id } = req.params;
    try {
      const { error } = validator.validate({ id });
      if (error) {
        return Response.responseValidationError(res, Errors.INVALID_ID);
      }
      const stateToDelete = await Query.deleteState(id);
      return !stateToDelete
        ? Response.responseNotFound(res, Errors.INVALID_MOVIE)
        : Response.responseOk(res, stateToDelete);
    } catch (error) {
      return Response.responseServerError(res);
    }
  }
}

export default StateController;

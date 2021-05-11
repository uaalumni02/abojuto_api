import * as Response from "../helpers/response/response";
import Errors from "../helpers/constants/constants";
import validator from "../validator/state";
import Query from "../database/queries/query";

class StateData {
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
      console.log(err)
      return Response.responseServerError(res);
    }
  }
}

export default StateData;

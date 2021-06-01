import * as Response from "../helpers/response/response";
import Errors from "../helpers/constants/constants";
import validator from "../validator/supervisor";
import Query from "../database/queries/supervisor";

class SupervisorController {
  static async addSupervisorData(req, res) {
    const supervisorData = { ...req.body };
    try {
      const { error } = validator.validate(supervisorData);
      if (error) {
        return Response.responseBadRequest(res, Errors.VALIDATION);
      }
      const supervisorInfo = await Query.addSupervisor(supervisorData);
      return Response.responseOkCreated(res, supervisorInfo);
    } catch (err) {
      console.log(err)
      return Response.responseServerError(res);
    }
  }
  static async getAllSupervisors(req, res) {
    try {
      const getAllSupervisors = await Query.getSupervisors(req);
      return Response.responseOk(res, getAllSupervisors);
    } catch (error) {
      console.log(error)
      return Response.responseServerError(res);
    }
  }
  static async getSupervisorByState(req, res) {
    const { id } = req.params;
    try {
      // const { error } = validator.validate({ id });
      // if (error) {
      //   return Response.responseValidationError(res, Errors.INVALID_ID);
      // }
      const SupervisorByState = await Query.SupervisorByStateId(id);
      return SupervisorByState.length == 0
        ? Response.responseNotFound(res, Errors.INVALID_DATA)
        : Response.responseOk(res, SupervisorByState);
    } catch (error) {
      console.log(error)
      return Response.responseServerError(res);
    }
  }
}

export default SupervisorController;

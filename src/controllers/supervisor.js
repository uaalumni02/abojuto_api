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
      return Response.responseServerError(res);
    }
  }
  static async getAllSupervisors(req, res) {
    try {
      const getAllSupervisors = await Query.getSupervisors(req);
      return Response.responseOk(res, getAllSupervisors);
    } catch (error) {
      return Response.responseServerError(res);
    }
  }
  static async searchForSupervisor(req, res) {
    let { state: id, license, modality, specialty } = req.query;

    if (modality) {
      modality = modality.split(",");
    }

    if (specialty) {
      specialty = specialty.split(",");
    }

    try {
      // const { error } = validator.validate({ state: id });
      // if (error) {
      //   return Response.responseValidationError(res, Errors.INVALID_ID);
      // }
      let SupervisorByState = await Query.FindSupervisor(
        id,
        license,
        modality,
        specialty
      );

      const withModalities = await Promise.all(
        SupervisorByState.map(async (sup) => {
          const mod = await Query.FindSupervisorMod(sup.user_id);
          const specialty = await Query.FindSupervisorSpecialty(sup.user_id);

          sup.specialty_id = specialty;
          sup.modality_id = mod;
          return sup;
        })
      );

      return SupervisorByState.length == 0
        ? Response.responseNotFound(res, Errors.INVALID_DATA)
        : Response.responseOk(res, withModalities);
    } catch (error) {
      return Response.responseServerError(res);
    }
  }
}

export default SupervisorController;

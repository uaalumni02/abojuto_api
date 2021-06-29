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
      let SupervisorByState = await Query.FindSupervisor(
        id,
        license,
        modality,
        specialty
      );

      let withModalities = await Promise.all(
        SupervisorByState.map(async (sup) => {
          const mod = await Query.FindSupervisorMod(sup.user_id);
          const specialty = await Query.FindSupervisorSpecialty(sup.user_id);

          sup.specialty_id = specialty;
          sup.modality_ids = mod.map((m) => m.modality_id);
          sup.modalities = mod.map((m) => m.modality);
          return sup;
        })
      );

      if (modality && modality.length) {
        withModalities = withModalities.filter((rr) => {
          return modality.every((id) => rr.modality_ids.includes(Number(id)));
        });
      }

      return SupervisorByState.length == 0
        ? Response.responseNotFound(res, Errors.INVALID_DATA)
        : Response.responseOk(res, withModalities);
    } catch (error) {
      console.log(error);
      return Response.responseServerError(res);
    }
  }
}

export default SupervisorController;

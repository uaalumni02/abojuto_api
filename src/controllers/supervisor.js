import * as Response from "../helpers/response/response";
import Errors from "../helpers/constants/constants";
import validator from "../validator/supervisor";
import Query from "../database/queries/supervisor";
import Token from "../helpers/jwt/token";
import bcrypt from "../helpers/bcrypt/bcrypt";

//need to send email when appts are scheduled
//need to notify when pswd is not correct
//change route to add supervisor shouldnt be supervisor/search

class SupervisorController {
  static async addSupervisorData(req, res) {
    const { email, password } = req.body;
    try {
      const supervisorData = await Query.findSupervisorByEmail(email);
      if (supervisorData.length > 0) {
        return Response.responseConflict(res, supervisorData);
      } else {
        const hash = await bcrypt.hashPassword(req.body.password, 10);
        const supervisor = { ...req.body, password: hash };
        const supervisorResponse = await Query.addSupervisor(supervisor);
        const { user_id } = supervisorResponse;
        const token = Token.sign({ user_id });

        return Response.responseOkCreated(res, { token, user_id });
      }
    } catch (error) {
      return Response.responseServerError(res);
    }
  }
  static async supervisorLogin(req, res) {
    const { email, password } = req.body;
    try {
      const supervisor = await Query.findSupervisorByEmail(email);
      if (supervisor.length < 1) {
        return Response.responseBadAuth(res, supervisor);
      }
      const isSamePassword = await bcrypt.comparePassword(
        password,
        supervisor[0].password
      );
      if (isSamePassword) {
        const token = Token.sign({
          email: supervisor.email,
          user_id,
        });
        const {
          user_id,
          name,
          about,
          license,
          supervision_credentials,
          universities,
        } = supervisor[0];
        const supervisorData = {
          user_id,
          name,
          about,
          license,
          supervision_credentials,
          universities,
          token,
        };

        return Response.responseOk(res, supervisorData);
      } else {
        return Response.responseBadAuth(res);
      }
    } catch (error) {
      console.log(error);
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
    let { state: stateId, license, modality, specialty } = req.query;

    if (modality) {
      modality = modality.split(",");
    }

    if (specialty) {
      specialty = specialty.split(",");
    }

    try {
      let SupervisorByState = await Query.FindSupervisor(
        stateId,
        license,
        modality,
        specialty
      );

      let withModalities = await Promise.all(
        SupervisorByState.map(async (sup) => {
          const mod = await Query.FindSupervisorMod(sup.user_id);
          const specialty = await Query.FindSupervisorSpecialty(sup.user_id);
          const licenses = await Query.getUserLicenseCategories(sup.user_id);

          sup.modality_ids = mod.map((m) => m.modality_id);
          sup.modalities = mod.map((m) => m.modality);
          sup.specialty_ids = specialty.map((s) => s.specialty_id);
          sup.specialties = specialty.map((s) => s.specialty);
          sup.licenses = licenses;
          sup.licenseCategoryIds = licenses.map((l) => l.category_id);
          return sup;
        })
      );

      if (modality && modality.length) {
        withModalities = withModalities.filter((rr) => {
          return modality.every((id) => rr.modality_ids.includes(Number(id)));
        });
      }

      if (specialty && specialty.length) {
        withModalities = withModalities.filter((ss) => {
          return specialty.every((id) => ss.specialty_ids.includes(Number(id)));
        });
      }

      if (license) {
        withModalities = withModalities.filter((user) =>
          user.licenseCategoryIds.includes(Number(license))
        );
      }

      return SupervisorByState.length == 0
        ? Response.responseNotFound(res, Errors.INVALID_DATA)
        : Response.responseOk(res, withModalities);
    } catch (error) {
      return Response.responseServerError(res);
    }
  }
  static async getSupervisorById(req, res) {
    const { id } = req.params;
    try {
      const supervisorById = await Query.supervisorById(id);
      return supervisorById.length == 0
        ? Response.responseNotFound(res, Errors.INVALID_DATA)
        : Response.responseOk(res, supervisorById);
    } catch (error) {
      return Response.responseServerError(res);
    }
  }
}

export default SupervisorController;

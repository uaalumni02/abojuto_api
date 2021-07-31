import * as Response from "../helpers/response/response";
import Errors from "../helpers/constants/constants";
import validator from "../validator/appointments";
import Query from "../database/queries/appointments";
import moment from "moment";

class AppointmentController {
  static async addAppointmentData(req, res) {
    const appointmentData = { ...req.body };
    const appointmentTimestamp = moment(
      appointmentData.appointmentDate,
      "YYYY-MM-DD"
    ).unix();
    console.log(appointmentTimestamp)
    appointmentData.appointmentDate = appointmentTimestamp;
    try {
      const { error } = validator.validate(appointmentData);
      if (error) {
        return Response.responseBadRequest(res, Errors.VALIDATION);
      }
      const appointmentInfo = await Query.addAppointment(appointmentData);
      return Response.responseOkCreated(res, appointmentInfo);
    } catch (error) {
      console.log(error);
      return Response.responseServerError(res);
    }
  }
  static async getAllAppointments(req, res) {
    try {
      const getAllAppointments = await Query.getAppointments(req);
      return Response.responseOk(res, getAllAppointments);
    } catch (error) {
      return Response.responseServerError;
    }
  }
  static async getAppointmentByUserorCustomer(req, res) {
    const { id } = req.params;
    try {
      const userOrCustomerById = await Query.userOrCustomerById(id);
      if (userOrCustomerById.length == 1) {
        return Response.responseOk(res, userOrCustomerById);
      } else {
        return Response.responseNotFound(res, Errors.INVALID_DATA);
      }
    } catch (error) {
      return Response.responseServerError(res);
    }
  }
  static async getAppointmentByDate(req, res) {
    let { date, userId } = req.query;
    try {
      const appointmentByDate = await Query.appointmentByDate(date, userId);
      return Response.responseOk(res, appointmentByDate);
    } catch (error) {
      return Response.responseNotFound(res);
    }
  }
}

export default AppointmentController;

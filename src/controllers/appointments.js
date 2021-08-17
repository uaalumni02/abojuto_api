import * as Response from "../helpers/response/response";
import Errors from "../helpers/constants/constants";
import validator from "../validator/appointments";
import Query from "../database/queries/appointments";
import moment from "moment";

import sendHandler from "../helpers/email/mailer";

class AppointmentController {
  static async addAppointmentData(req, res) {
    const appointmentData = { ...req.body };
    const appointmentTimestamp = moment(
      appointmentData.appointmentDate,
      "YYYY-MM-DD"
    ).unix();
    appointmentData.appointmentDate = appointmentTimestamp;
    try {
      const { error } = validator.validate(appointmentData);
      if (error) {
        return Response.responseBadRequest(res, Errors.VALIDATION);
      }
      const appointmentInfo = await Query.addAppointment(appointmentData);
      const appointmentId = appointmentInfo[0].id

      await sendAppoinmentEmail(appointmentId)

      async function sendAppoinmentEmail (appointmentId) {
        const appointmentById = await Query.appointmentById(
          appointmentId
        );
        const dateString = moment
          .unix(appointmentById[0].appointmentDate)
          .format("YYYY-MM-DD");
        const customerMessage =
          "Hi " +
          appointmentById[0].first_name +
          "your appointment has been confirmed and is scheduled on " +
          dateString +
          " at " +
          appointmentById[0].time +
          " with " +
          appointmentById[0].name;
        sendHandler(customerMessage);

      }
      return Response.responseOkCreated(res, appointmentInfo);
    } catch (error) {
      console.log(error)
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
  static async getAppointmentById(req, res) {
    const { id } = req.params;
    try {
      const appointmentById = await Query.appointmentById(id);
      if (appointmentById.length == 1) {
        return Response.responseOk(res, appointmentById);
      } else {
        return Response.responseNotFound(res, Errors.INVALID_DATA);
      }
    } catch (error) {
      return Response.responseServerError(res);
    }
  }
}

export default AppointmentController;

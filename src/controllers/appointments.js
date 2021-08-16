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
    const dateString = moment.unix(appointmentTimestamp).format("YYYY-MM-DD");

    const customerMessage =
      "Hi your appointment has been confirmed and is scheduled on " +
      dateString;

      function sendEmail(appointmentId, type) {
//need get appt by id
        // To simplify this function, the parts can also be broken down
        //Take the appointment ID and fetches all data
        // Customer name, supervisros name, email adedress of both parties.
        // Appintment date and time

        // Check if type is new/updated
        // Send email to both parties
      }

    sendHandler(customerMessage);
    // send email after post; with the appt id; then fetch data by id 
    try {
      const { error } = validator.validate(appointmentData);
      if (error) {
        return Response.responseBadRequest(res, Errors.VALIDATION);
      }
      const appointmentInfo = await Query.addAppointment(appointmentData);
      return Response.responseOkCreated(res, appointmentInfo);
    } catch (error) {
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

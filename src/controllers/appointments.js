import * as Response from "../helpers/response/response";
import Errors from "../helpers/constants/constants";
import validator from "../validator/appointments";
import Query from "../database/queries/appointments";
import moment from "moment";

import gmail from "node-gmailer";

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
    const recipient = process.env.GMAIL_ADDRESS;
    const messageData = {
      subject: "Customer Message",
      text: customerMessage,
    };
    const sendHandler = () => {
      gmail
        .send(recipient, messageData)
        .then((response) => {})
        .catch((error) => {});
    };
    try {
      const { error } = validator.validate(appointmentData);
      sendHandler();
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

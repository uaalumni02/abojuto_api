import * as Response from "../helpers/response/response";
import Errors from "../helpers/constants/constants";
import Query from "../database/queries/customer";
import Token from "../helpers/jwt/token";
import bcrypt from "../helpers/bcrypt/bcrypt";
import validator from "../validator/customers";

class CustomerController {
  static async addCustomerData(req, res) {
    const { email, password } = req.body;
    try {
      const customerRegister = await Query.findCustomer(email);
      if (customerRegister.length > 0) {
        return Response.responseConflict(res, customerRegister);
      } else {
        const hash = await bcrypt.hashPassword(password, 10);
        const customer = { ...req.body, password: hash };
        const customerResponse = await Query.addCustomer(customer);
        const { customer_id, first_name, last_name, email, phone } =
          customerResponse;
        const token = Token.sign({ customer_id });
        const customerData = {
          customer_id,
          first_name,
          last_name,
          email,
          phone,
          token,
        };
        return Response.responseOkCreated(res, customerData);
      }
    } catch (error) {
      return Response.responseServerError(res);
    }
  }

  static async userLogin(req, res) {
    const { email, password } = req.body;
    try {
      const user = await Query.findCustomer(email);
      if (user == null) {
        //check here for email issue
        return Response.responseBadAuth(res, user);
      }
      const isSamePassword = await bcrypt.comparePassword(
        password,
        user[0].password
      );
      if (isSamePassword) {
        const token = Token.sign({
          email: user.email,
          customer_id: user.customer_id,
        });
        const { customer_id, first_name, last_name, email, phone } = user[0];
        const customerData = {
          customer_id,
          first_name,
          last_name,
          email,
          phone,
          token,
        };

        return Response.responseOk(res, customerData);
      } else {
        return Response.responseBadAuth(res);
      }
    } catch (error) {
      return Response.responseServerError(res);
    }
  }

  static async getAllCustomers(req, res) {
    try {
      const getAllCustomers = await Query.getCustomers(req);
      return Response.responseOk(res, getAllCustomers);
    } catch (error) {
      return Response.responseServerError(res);
    }
  }
  static async getCustomerById(req, res) {
    const { id } = req.params;
    try {
      const { error } = validator.validate({ id });
      if (error) {
        return Response.responseValidationError(res, Errors.INVALID_ID);
      }
      const customerById = await Query.customerById(id);
      if (customerById.length == 1) {
        return Response.responseOk(res, customerById);
      } else {
        return Response.responseNotFound(res, Errors.INVALID_DATA);
      }
    } catch (error) {
      return Response.responseServerError(res);
    }
  }
}

export default CustomerController;

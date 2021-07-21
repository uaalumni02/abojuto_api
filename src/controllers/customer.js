import * as Response from "../helpers/response/response";
import Errors from "../helpers/constants/constants";
import validator from "../validator/customers";
import Query from "../database/queries/customer";
import Token from "../helpers/jwt/token";
import bcrypt from "../helpers/bcrypt/bcrypt";

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

  
  static async getAllCustomers(req, res) {
    try {
      const getAllCustomers = await Query.getCustomers(req);
      return Response.responseOk(res, getAllCustomers);
    } catch (error) {
      return Response.responseServerError(res);
    }
  }
}

export default CustomerController;

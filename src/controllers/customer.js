import * as Response from "../helpers/response/response";
import Errors from "../helpers/constants/constants";
import validator from "../validator/customers";
import Query from "../database/queries/customer";
import Token from "../helpers/jwt/token";
import bcrypt from "../helpers/bcrypt/bcrypt";

let token = "";
class CustomerController {
  static async addCustomerData(req, res) {
    const { email, password } = req.body;
    try {
      const customerRegister = await Query.findCustomer(email);
      if (customerRegister.length > 0) {
        return Response.responseConflict(res, customerRegister);
      } else {
        const hash = await bcrypt.hashPassword(password, 10);
        let customer = { ...req.body, password: hash };
        customer = await Query.addCustomer(customer);
        token = Token.sign({ password });
        const customerData = { ...req.body, password: undefined, token };
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

import db from "../knex";

class Query {
  static async addCustomer(data) {
    try {
      const customerInfo = await db
        .insert(data)
        .returning("*")
        .into("customers");
      return customerInfo[0];
    } catch (error) {
      throw error;
    }
  }
  static async getCustomers() {
    try {
      const getAllCustomers = await db
        .select()
        .from("customers")
        .orderBy("customer_id");
      return getAllCustomers;
    } catch (error) {
      throw error;
    }
  }
  static async findCustomer(email) {
    try {
      const customer = await db("customers").where({ email }).select("*");
      return customer;
    } catch (error) {
      throw error;
    }
  }
  static async customerById(customer_id) {
    try {
      const customerById = await db("customers")
      .join("appointments", "appointments.customerId", "customers.customer_id")
       .join("times", "times.timeId", "appointments.time_id" )
          .join("supervisor", "supervisor.user_id", "customers.supervisor_id")
        .where({ customer_id })
        .select("*");
      return customerById;
    } catch (error) {
      throw error;
    }
  }
}

export default Query;

import db from "../knex";

class Query {
  static async addCustomer(data) {
    try {
      const customerInfo = await db
        .insert(data)
        .returning("*")
        .into("customers");
      return customerInfo;
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
}

export default Query;

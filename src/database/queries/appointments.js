import db from "../knex";

class Query {
  static async addAppointment(data) {
    try {
      const appointmentInfo = await db
        .insert(data)
        .returning("*")
        .into("appointments");
      return appointmentInfo;
    } catch (error) {
      throw error;
    }
  }
  static async getAppointments() {
    try {
      const getAllTimes = await db.select().from("appointments").orderBy("id");
      return getAllTimes;
    } catch (error) {
      throw error;
    }
  }
  static async userOrCustomerById(user_id) {
    console.log(user_id)
    try {
      const userOrCustomerById = await db("appointments")
        .where({ user_id})
        .orWhere({ customer_id: user_id })
        .select();
      return userOrCustomerById;
    } catch (error) {
      throw error;
    }
  }
}

export default Query;

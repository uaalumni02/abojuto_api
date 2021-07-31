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
  static async userOrCustomerById(userId) {
    try {
      const userOrCustomerById = await db("appointments")
        .join("times", "times.id", "appointments.time_id")
        .join("supervisor", "supervisor.user_id", "appointments.userId")
        .join("customers", "customers.customer_id", "appointments.customerId")
        .where({ userId })
        .orWhere({ customer_id: userId })
        .select("*");
      return userOrCustomerById;
    } catch (error) {
      throw error;
    }
  }
 
  static async appointmentByDate(appointmentDate, userId) {
    try {
      const appointmentByDate = await db("appointments")
        .where({ appointmentDate })
        .andWhere({userId})
        .select("*");
      return appointmentByDate;
    } catch (error) {
      throw error;
    }
  }
}
export default Query;

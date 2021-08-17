import db from "../knex";

class Query {
  static async addTimes(data) {
    try {
      const timesInfo = await db.insert(data).returning("*").into("times");
      return timesInfo;
    } catch (error) {
      throw error;
    }
  }
  static async getTimes() {
    try {
      const getAllTimes = await db.select().from("times").orderBy("timeId");
      return getAllTimes;
    } catch (error) {
      throw error;
    }
  }
}

export default Query;

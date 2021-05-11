import db from "../knex";

class Query {
  
  static async addState(data) {
    try {
      const stateInfo = await db.insert(data).returning("*").into("state");
      return stateInfo;
    } catch (error) {
      throw error;
    }
  }
}

export default Query;

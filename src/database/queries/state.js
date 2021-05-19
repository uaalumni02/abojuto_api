import db from "../knex";

class Query {
  static async addState(data) {
    try {
      const stateInfo = await db.insert(data).returning("*").into("states");
      return stateInfo;
    } catch (error) {
      throw error;
    }
  }
  static async getStates() {
    try {
      const getAllStates = await db.select().from("states").orderBy("id");
      return getAllStates;
    } catch (error) {
      throw error;
    }
  }
  static async deleteState(id) {
    try {
      const stateToDelete = await db("states").where({ id }).del();
      return stateToDelete;
    } catch (error) {
      throw error;
    }
  }
  static async stateById(id) {
    try {
      const stateById = await db("states").where({ id }).select();
      return stateById;
    } catch (error) {
      throw error;
    }
  }
}

export default Query;

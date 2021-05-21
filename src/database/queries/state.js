import db from "../knex";

class Query {
  static async addState(data) {
    // db.insert([
    //   { name: 'Ohio', stateId: 22},
    //   { name: 'Florida', stateId: 25}
    // ])

    // userId
    // email
    // first
    // last
    // created
    // password
    // phone

    // SLECT user.user_id, userstates.stateid WHERE state.id = 1 OR state = 1 JOIN ON state.user_id = user_id

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

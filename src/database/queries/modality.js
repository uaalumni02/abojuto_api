import db from "../knex";

class Query {
  static async addModality(data) {
    try {
      const modalityInfo = await db.insert(data).returning("*").into("modality");
      return modalityInfo;
    } catch (error) {
      throw error;
    }
  }
  static async getModalities() {
    try {
      const getAllModalities = await db.select().from("modality").orderBy("id");
      return getAllModalities;
    } catch (error) {
      throw error;
    }
  }
}

export default Query;

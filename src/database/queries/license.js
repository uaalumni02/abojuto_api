import db from "../knex";

class Query {
  static async addLicense(data) {
    try {
      const licenseInfo = await db.insert(data).returning("*").into("license");
      return licenseInfo;
    } catch (error) {
      throw error;
    }
  }
  static async getLicense() {
    try {
      const getAllLicense = await db.select().from("license").orderBy("id");
      return getAllLicense;
    } catch (error) {
      throw error;
    }
  }
  static async licenseById(id) {
    try {
      const licenseById = await db("license").where({ id }).select();
      return licenseById;
    } catch (error) {
      throw error;
    }
  }
}


export default Query;

import db from "../knex";

class Query {
  static async addSpecialty(data) {
    try {
      const licenseInfo = await db
        .insert(data)
        .returning("*")
        .into("specialty");
      return licenseInfo;
    } catch (error) {
      throw error;
    }
  }
  static async getAllSpecialties() {
    try {
      const getAllLicense = await db.select().from("specialty").orderBy("id");
      return getAllLicense;
    } catch (error) {
      throw error;
    }
  }
  static async specialtyById(id) {
    try {
      const licenseById = await db("specialty").where({ id }).select();
      return licenseById;
    } catch (error) {
      throw error;
    }
  }
}

export default Query;

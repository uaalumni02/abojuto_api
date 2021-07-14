import db from "../knex";

class Query {
  static async addLicenseCategory(data) {
    try {
      const categoryInfo = await db
        .insert(data)
        .returning("*")
        .into("license_categories");
      return categoryInfo;
    } catch (error) {
      throw error;
    }
  }
  static async getCategories() {
    try {
      const getAllCategories = await db
        .select()
        .from("license_categories")
        .orderBy("license_id");
      return getAllCategories;
    } catch (error) {
      throw error;
    }
  }
}

export default Query;

import db from "../knex";

class Query {
  static async addSupervisor(data) {
    try {
      const supervisorInfo = await db
        .insert(data)
        .returning([
          "name",
          "about",
          "license",
          "supervision_credentials",
          "universities",
          "email",
          "password",
          "user_id",
        ])
        .into("supervisor");
      return supervisorInfo;
    } catch (error) {
      throw error;
    }
  }
  static async getSupervisors() {
    try {
      const getAllSupervisors = await db
        .select()
        .from("supervisor")
        .orderBy("user_id");
      return getAllSupervisors;
    } catch (error) {
      throw error;
    }
  }

  static async getUserLicenseCategories(userId) {
    const licenses = await db("user_licenses")
      .select("*")
      .innerJoin("license", "user_licenses.id", "=", "license.id")
      .where({ "user_licenses.user_id": userId });

    return licenses;
  }

  static async FindSupervisor(stateId, license, modality = [], specialty = []) {
    try {
      const SupervisorByState = await db
        .distinct("supervisor.*")
        .from("supervisor")
        .innerJoin(
          "user_states",
          "supervisor.user_id",
          "=",
          "user_states.user_id"
        )
        .innerJoin(
          "user_modalities",
          "supervisor.user_id",
          "=",
          "user_modalities.user_id"
        )

        .innerJoin(
          "user_specialties",
          "supervisor.user_id",
          "=",
          "user_specialties.user_id"
        )

        .modify(function (queryBuilder) {
          if (stateId) {
            queryBuilder.where({ "user_states.state_id": stateId });
          }
          if (modality.length) {
            queryBuilder.whereIn("user_modalities.modality_id", modality);
          }
          if (specialty.length) {
            queryBuilder.whereIn("user_specialties.specialty_id", specialty);
          }
        });
      return SupervisorByState;
    } catch (error) {
      throw error;
    }
  }
  static async FindSupervisorMod(user_id) {
    try {
      const modById = await db("user_modalities")
        .join("modality", "modality.id", "user_modalities.modality_id")
        .where({ user_id })
        .select("*");
      return modById;
    } catch (error) {
      throw error;
    }
  }
  static async FindSupervisorSpecialty(user_id) {
    try {
      const specialtyById = await db("user_specialties")
        .join("specialty", "specialty.id", "user_specialties.specialty_id")
        .where({ user_id })
        .select("*");
      return specialtyById;
    } catch (error) {
      throw error;
    }
  }
  static async supervisorById(user_id) {
    try {
      const supervisorById = await db("supervisor").where({ user_id }).select();
      return supervisorById;
    } catch (error) {
      throw error;
    }
  }
  static async findSupervisorByEmail(email) {
    try {
      const supervisor = await db("supervisor").where({ email }).select("*");
      return supervisor;
    } catch (error) {
      throw error;
    }
  }
}

export default Query;

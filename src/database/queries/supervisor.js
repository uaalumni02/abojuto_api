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

  static async FindSupervisor(id, license, modality = [], specialty = []) {
    try {
      const SupervisorByState = await db
        .select("*")
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
        .where({
          "user_states.state_id": id,
        })
        .modify(function (queryBuilder) {
          if (license) {
            queryBuilder.andWhere({ "supervisor.license": license });
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
        .where({ user_id })
        .select("modality_id");
      return modById;
    } catch (error) {
      throw error;
    }
  }
  static async FindSupervisorSpecialty(user_id) {
    try {
      const specialtyById = await db("user_specialties")
        .where({ user_id })
        .select("specialty_id");
      return specialtyById;
    } catch (error) {
      throw error;
    }
  }
}

export default Query;

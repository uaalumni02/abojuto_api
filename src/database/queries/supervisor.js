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

  static async FindSupervisor(id, license, modality) {
    try {
      const SupervisorByState = await db
        .distinct()
        .select()
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
        .where({
          "user_states.state_id": id,
        })
        .modify(function (queryBuilder) {
          if (license) {
            queryBuilder.andWhere({ "supervisor.license": license });
          }
          if (modality) {
            queryBuilder.whereIn("user_modalities.modality_id", [modality]);
          }
        });

      return SupervisorByState;
    } catch (error) {
      throw error;
    }
  }
}

export default Query;

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
  static async SupervisorByStateId(id) {
    try {
      const SupervisorByState = await db
        .distinct()
        .select()
        .from("supervisor")
        .innerJoin(
          "user_states",
          "supervisor.state_id",
          "=",
          "user_states.state_id"
        ).where({'supervisor.state_id': id })
        // can join speciciality and modality and add in where
      return SupervisorByState;
    } catch (error) {
      throw error;
    }
  }
}


export default Query;


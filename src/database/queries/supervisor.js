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


  // app.get('/supervisor/search', (req, res) => ) {
  //   //req.query
  // }
  // need new route supervisor/search

  // findSupervisors(params) {
  //   //pass params to where clause
  // }
  //rename below to findSupervisors
  static async FindSupervisor(id) {
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
        ).where({'user_states.state_id': id })
        // can join speciciality and modality and add in where
      return SupervisorByState;
    } catch (error) {
      throw error;
    }
  }
}


export default Query;


const Joi = require("@hapi/joi");

const schema = Joi.object({
  specialty: Joi.string(),
  //   required()
  id: Joi.number(),
});
export default schema;
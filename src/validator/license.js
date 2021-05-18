const Joi = require("@hapi/joi");

const schema = Joi.object({
  license: Joi.string(),
  //   required()
  id: Joi.number(),
});
export default schema;
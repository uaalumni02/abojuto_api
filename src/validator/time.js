const Joi = require("@hapi/joi");

const schema = Joi.object({
  time: Joi.string().min(3).max(13),
  //   required()
  id: Joi.number(),
});
export default schema;
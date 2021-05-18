const Joi = require("@hapi/joi");

const schema = Joi.object({
  name: Joi.string().min(4).max(13),
  //   required()
  id: Joi.number(),
});
export default schema;

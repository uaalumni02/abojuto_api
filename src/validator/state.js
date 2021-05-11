const Joi = require("@hapi/joi");

const schema = Joi.object({
  state: Joi.string().min(4).max(13),
  //   required()
});

export default schema;

const Joi = require("@hapi/joi");

const schema = Joi.object({
  license: Joi.string(),
  //   required()
  id: Joi.string()
    .min(1)
    .regex(/^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i),
});
export default schema;

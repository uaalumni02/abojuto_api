const Joi = require("@hapi/joi");

const schema = Joi.object({
  first_name: Joi.string(),
  last_name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
  password: Joi.string(),
});
export default schema;

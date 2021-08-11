const Joi = require("@hapi/joi");

const schema = Joi.object({
  name: Joi.string(),
  about: Joi.string(),
  license: Joi.string(),
  supervision_credentials: Joi.string(),
  universities: Joi.string(),
  email: Joi.string(),
  password: Joi.string(),
});
export default schema;

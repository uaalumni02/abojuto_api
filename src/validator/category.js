const Joi = require("@hapi/joi");

const schema = Joi.object({
  license_title: Joi.string(),
  license_id: Joi.number()
});
export default schema;

const Joi = require("@hapi/joi");

const schema = Joi.object({
  modality: Joi.string(),
  //   required()
  id: Joi.number(),
});
export default schema;
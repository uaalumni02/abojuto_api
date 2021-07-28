const Joi = require("@hapi/joi");

const schema = Joi.object({
  userId: Joi.string()
    .min(1)
    .regex(/^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i),
  customer_id: Joi.string()
    .min(1)
    .regex(/^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i),
  time_id: Joi.number(),
  appointmentDate: Joi.number(),
});
export default schema;

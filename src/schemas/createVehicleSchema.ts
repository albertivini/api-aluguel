import Joi from 'joi';

export const createVehicleSchema = Joi.object().keys({
  name: Joi.string().strict().trim().required(),
  brand: Joi.string().strict().trim().required(),
});

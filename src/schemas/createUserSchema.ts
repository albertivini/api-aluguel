import Joi from 'joi';

export const createUserSchema = Joi.object().keys({
  name: Joi.string().strict().trim().required(),
  email: Joi.string().email().required(),
  password: Joi.string().alphanum().required(),
  isAdmin: Joi.boolean().default(false),
});

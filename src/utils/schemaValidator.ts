import Joi from 'joi';

export function schemaValidator(body: unknown, schema: Joi.ObjectSchema<any>) {
  const result = schema.validate(body);

  if (result.error) {
    const error_message = result.error.details[0].message;

    throw new Error(error_message);
  }

  return result.value;
}

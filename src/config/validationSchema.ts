import * as Joi from 'joi';

export const validationSchema = Joi.object({
  MESSAGE_QUEUE_HOST: Joi.string().required(),
  MESSAGE_QUEUE_PORT: Joi.number().required(),
  DATABASE_HOST: Joi.string().required(),
  DATABASE_PORT: Joi.number().required(),
  DATABASE_USER: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required(),
  DATABASE_SYNCHRONIZE: Joi.boolean().required(),
});

import Joi from 'joi';
import { app } from './task2.js';
import { createValidator } from 'express-joi-validation';

export const validator = createValidator();

const validateLogin = (value, helpers) => {
  const loginExists = app.locals.users.some((user) => user.login === value);

  if (loginExists) {
    throw new Error('this login alerady exists');
  }

  return value;
};

export const bodySchema = Joi.object({
  login: Joi.string().custom(validateLogin).required(),
  password: Joi.string().alphanum().required(),
  age: Joi.number().ruleset.min(4).max(130).rule({ message: 'User’s age must be between 4 and 130' }).required()
});

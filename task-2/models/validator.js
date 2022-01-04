import Joi from 'joi';
import { createValidator } from 'express-joi-validation';
import { db } from '../data-access/db.js';

export const validator = createValidator();

export const createUserSchema = (req, res, next) => {
  const schema = Joi.object({
    login: Joi.string().external(validateLogin).required(),
    password: Joi.string().alphanum().required(),
    age: Joi.number().ruleset.min(4).max(130).rule({ message: 'User\'s age must be between 4 and 130' }).required()
  });

  validateUser(req, next, schema);
};

export const updateUserSchema = Joi.object({
  login: Joi.string(),
  password: Joi.string().alphanum(),
  age: Joi.number().ruleset.min(4).max(130).rule({ message: 'User\'s age must be between 4 and 130' })
});

const validateLogin = async (login) => {
  const user = await db.user.getUserByLogin(login);

  if (user) {
    return Promise.reject({ message: 'User already exists' });
  }

  return Promise.resolve(login);
};

const validateUser = async (req, next, schema) => {
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true // remove unknown props
  };

  try {
    await schema.validateAsync(req.body, options);

    next();
  } catch (e) {
    next(`Validation error: ${e?.message}`);
  }
};

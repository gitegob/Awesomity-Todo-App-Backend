import Joi from 'joi';

const schema = {
  signup: Joi.object({
    firstName: Joi
      .string()
      .trim()
      .regex(/^[\sA-Za-z]{1,}$/)
      .required()
      .error(new Error('firstName is required and cannot only contain letters')),
    lastName: Joi
      .string()
      .trim()
      .regex(/^[\sA-Za-z]{1,}$/)
      .required()
      .error(new Error('lastName is required and cannot only contain letters')),
    username: Joi
      .string()
      .trim()
      .regex(/^[a-zA-Z]([a-zA-Z0-9_.]){3,20}$/)
      .required()
      .error(new Error('username must be 4-20 characters with letters and numbers and start with a letter')),
    password: Joi
      .string()
      .trim()
      .regex(/^(?=.*[a-z])(?=.*[A-Z]).{5,128}$/)
      .required()
      .error(new Error('password must be atleast 6 characters with atleast 1 capital letter')),
  }),
  login: Joi.object({
    username: Joi
      .string()
      .trim()
      .required()
      .error(new Error('username is required')),
    password: Joi
      .string()
      .trim()
      .required()
      .error(new Error('password is required')),
  }),
  todo: Joi.object({
    title: Joi
      .string()
      .trim()
      .max(100)
      .required()
      .error(new Error('title is required and must not exceed 100 characters')),
    description: Joi
      .string()
      .trim()
      .required()
      .error(new Error('description is required')),
    priority: Joi.string()
      .valid('HIGH', 'MEDIUM', 'LOW')
      .required()
      .error(new Error('priority is required and must be one of HIGH, MEDIUM or LOW')),
  }),
  todoUpdate: Joi.object({
    title: Joi
      .string()
      .trim()
      .max(100)
      .error(new Error('title must not exceed 100 characters')),
    description: Joi
      .string()
      .trim()
      .error(new Error('description must be a string')),
    priority: Joi.string()
      .valid('HIGH', 'MEDIUM', 'LOW')
      .error(new Error('priority must be one of HIGH, MEDIUM or LOW')),
  }),
  todoId: Joi
    .number()
    .min(1)
    .max(1000000)
    .error(new Error('Invalid Todo Id Paramater')),
};
export const joiVal = (valSchema, obj) => {
  const { error } = schema[valSchema].validate(obj);
  return error?.message;
};
export default schema;
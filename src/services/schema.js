import Joi from 'joi';

const stringRequired = Joi.string().trim().required();
const nameSchema = stringRequired.regex(/^[\sA-Za-z]{1,}$/);

const schema = {
  signup: Joi.object().keys({
    firstName: nameSchema
      .error(new Error('firstName is required and can only contain letters')),
    lastName: nameSchema
      .error(new Error('lastName is required and can only contain letters')),
    username: stringRequired
      .regex(/^[a-zA-Z]([a-zA-Z0-9_.]){3,20}$/)
      .error(new Error('username must be 4-20 characters with letters and numbers and start with a letter')),
    password: stringRequired
      .regex(/^(?=.*[a-z])(?=.*[A-Z]).{5,128}$/)
      .error(new Error('password must be atleast 6 characters with atleast 1 capital letter')),
  }),
  login: Joi.object().keys({
    username: stringRequired
      .error(new Error('username is required')),
    password: stringRequired
      .error(new Error('password is required')),
  }),
  todo: Joi.object().keys({
    title: stringRequired
      .max(100)
      .error(new Error('title is required and must not exceed 100 characters')),
    description: stringRequired
      .error(new Error('description is required')),
    priority: Joi.string()
      .valid('HIGH', 'MEDIUM', 'LOW')
      .required()
      .error(new Error('priority is required and must be one of HIGH, MEDIUM or LOW')),
  }),
  todoUpdate: Joi.object().keys({
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
    .error(new Error('Invalid Todo Id Parameter')),
  todoSearch: Joi
    .string()
    .trim()
    .max(100)
    .error(new Error('Invalid Search Parameter')),
};

export default schema;

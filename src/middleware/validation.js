import { joiVal } from "../utils/joi";
import * as send from '../utils/response';

const validate = (res, body, schema, next) => {
  const error = joiVal(schema, body);
  if (error) return send.error(res, 400, error);
  return next();
};

export const signupVal = (req, res, next) => validate(res, req.body, 'signup', next);

export const loginVal = (req, res, next) => validate(res, req.body, 'login', next);

export const todoVal = (req, res, next) => validate(res, req.body, 'todo', next);

export const todoUpdateVal = (req, res, next) => validate(res, req.body, 'todoUpdate', next);

export const paramtodoIdVal = (req, res, next) => validate(res, req.params.todoId, 'todoId', next);
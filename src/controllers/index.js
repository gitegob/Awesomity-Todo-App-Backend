import log from "../config/debug";
import { success, error } from "../utils/response";

export const welcome = (req, res) => {
  return success(res, 200, 'Welcome to the TodoApp API!');
};
export const notFound = (req, res) => {
  return error(res, 404, 'Sorry, That route is not here!');
};
export const handleError = (error, req, res, next) => {
  log.error('ERROR => ', error);
  return error(res, error.status || 500, `SERVER ERROR: ${error.message}`);
};
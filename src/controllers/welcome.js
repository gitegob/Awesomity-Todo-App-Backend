import { success, error } from "../utils/response";

/**
 * 
 * @param {object} req request
 * @param {object} res response
 * @returns {object} Welcome message
 */
export const welcome = (req, res) => {
  return success(res, 200, 'Welcome to the TodoApp API!');
};
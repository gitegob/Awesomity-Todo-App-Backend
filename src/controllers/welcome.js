import { success, error } from "../utils/response";

export const welcome = (req, res) => {
  return success(res, 200, 'Welcome to the TodoApp API!');
};
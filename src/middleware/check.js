import Password from '../database/models/Password';
import Todo from '../database/models/Todo';
import Todoist from '../database/models/Todoist';
import { dbAction } from '../database/services';
import { checkPassword } from '../utils/bcrypt';
import * as send from '../utils/response';

/** Find a user's task before performing further tasks on it
 *
 * @param {object} req request
 * @param {object} res response
 * @param {object} next move on to next middleware
 * @returns {object} Found todo
 */
export const findUserTodo = async (req, res, next) => {
  const todo = await dbAction(Todo, 'findOne', { where: { id: +req.params.todoId, todoistId: req.user.id } });
  if (!todo) return send.error(res, 404, 'Todo not found.');
  req.__todo = todo;
  return next();
};

/** Find a user and their password before logging in
 *
 * @param {object} req request
 * @param {object} res response
 * @param {object} next move on to next middleware
 * @returns {object} Found user
 */
export const loginCheck = async (req, res, next) => {
  const { username, password } = req.body;
  const user = await dbAction(Todoist, 'findOne', { where: { username } });
  if (!user) return send.error(res, 401, 'Invalid username or password');
  const pwd = await dbAction(Password, 'findOne', { where: { todoistId: user?.dataValues.id } });
  const pwdValid = checkPassword(password, pwd.dataValues?.password);
  if (!pwdValid) return send.error(res, 401, 'Invalid username or password');
  req.__user = user;
  return next();
};

/** Check to see if a user already exists before signup
 *
 * @param {object} req request
 * @param {object} res response
 * @param {object} next move on to next middleware
 * @returns {object} next
 */
export const signupCheck = async (req, res, next) => {
  const user = await dbAction(Todoist, 'findOne', { where: { username: req.body.username } });
  if (user) return send.error(res, 409, `Todoist ${req.body.username} already exists, Log in instead?`);
  return next();
};

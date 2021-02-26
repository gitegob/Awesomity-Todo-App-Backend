import Password from '../database/models/Password';
import Todo from '../database/models/Todo';
import Todoist from '../database/models/Todoist';
import DBService from '../services/db';
import Bcrypt from '../services/bcrypt';
import Response from '../services/response';
import schema from '../services/schema';

export default class Checker {
  /** Validate user input
 *
 * @param {object} req request
 * @param {object} res response
 * @param {object} next move on to next middleware
 * @returns {object} next
 */
  static validate(res, obj, valSchema, next) {
    const { error } = schema[valSchema].validate(obj);
    if (error) return Response.error(res, 400, error?.message);
    return next();
  }

  /** Find a user's task before performing further tasks on it
   *
   * @param {object} req request
   * @param {object} res response
   * @param {object} next move on to next middleware
   * @returns {object} Found todo
   */
  static async findUserTodo(req, res, next) {
    const todo = await DBService.dbAction(Todo, 'findOne', { where: { id: +req.params.todoId, todoistId: req.user.id } });
    if (!todo) return Response.error(res, 404, 'Todo not found.');
    req.__todo = todo;
    return next();
  }

  /** Find a user and their password before logging in
   *
   * @param {object} req request
   * @param {object} res response
   * @param {object} next move on to next middleware
   * @returns {object} Found user
   */
  static async loginCheck(req, res, next) {
    const { username, password } = req.body;
    const user = await DBService.dbAction(Todoist, 'findOne', { where: { username } });
    if (!user) return Response.error(res, 401, 'Invalid username or password');
    const pwd = await DBService.dbAction(Password, 'findOne', { where: { todoistId: user?.dataValues.id } });
    const pwdValid = Bcrypt.checkPassword(password, pwd.dataValues?.password);
    if (!pwdValid) return Response.error(res, 401, 'Invalid username or password');
    req.__user = user;
    return next();
  }

  /** Check to see if a user already exists before signup
   *
   * @param {object} req request
   * @param {object} res response
   * @param {object} next move on to next middleware
   * @returns {object} next
   */
  static async signupCheck(req, res, next) {
    const user = await DBService.dbAction(Todoist, 'findOne', { where: { username: req.body.username } });
    if (user) return Response.error(res, 409, `Todoist ${req.body.username} already exists, Log in instead?`);
    return next();
  }
}

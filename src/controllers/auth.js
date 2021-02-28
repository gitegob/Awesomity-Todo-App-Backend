import Response from '../services/response';
import DBService from '../services/db';
import Password from '../database/models/Password';
import Todoist from '../database/models/Todoist';
import PwdService from '../services/bcrypt';
import JWTService from '../services/jwt';

export default class AuthController {
/** Logs in the user
 *
 * @param {object} req request
 * @param {object} res response
 * @returns {object} Success, Token
 */
  static login(req, res) {
    const { __user: user } = req;
    const token = JWTService.signToken(user.dataValues, res);
    return Response.success(res, 200, `${req.body.username} logged in`, { token });
  }

  /** Signs up the user (async)
   *
   * @param {object} req request
   * @param {object} res response
   * @returns {object} Success
   */
  static async signup(req, res) {
    const { firstName, lastName, username } = req.body;
    const pwd = PwdService.hashPassword(req.body.password);
    if (pwd) {
      const newTodoist = await DBService.dbAction(Todoist, 'create', { firstName, lastName, username });
      if (newTodoist.dataValues) {
        const newPwd = await DBService.dbAction(Password, 'create', {
          todoistId: newTodoist.dataValues.id,
          password: pwd,
        });
        if (newPwd.dataValues) return Response.success(res, 201, 'Signup successful', { ...newTodoist.dataValues });
      }
    }
    return Response.error(res, 500, 'Signup Failed,Please Try again');
  }
}

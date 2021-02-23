import * as send from '../utils/response';
import { dbAction } from '../database/services';
import Password from '../database/models/Password';
import Todoist from '../database/models/Todoist';
import { hashPassword } from '../utils/bcrypt';
import { signToken } from '../utils/jwt';

/**
 * 
 * @param {object} req request
 * @param {object} res response
 * @returns {object} Success, Token
 */
export const login = async (req, res) => {
  const { __user: user } = req;
  const token = signToken(user?.dataValues, res);
  return send.success(res, 200, `${req.body.username} logged in`, { token });
};

/**
 * 
 * @param {object} req request
 * @param {object} res response
 * @returns {object} Success
 */
export const signup = async (req, res) => {
  const { firstName, lastName, username } = req.body;
  const pwd = hashPassword(req.body.password);
  if (pwd) {
    const newTodoist = await dbAction(Todoist, 'create', { firstName, lastName, username });
    if (newTodoist.dataValues) {
      const newPwd = await dbAction(Password, 'create', {
        todoistId: newTodoist.dataValues?.id,
        password: pwd,
      });
      if (newPwd.dataValues) return send.success(res, 201, 'Signup successful', { ...newTodoist.dataValues });
    }
  }
  return send.error(res, 500, 'Signup Failed,Please Try again');
};

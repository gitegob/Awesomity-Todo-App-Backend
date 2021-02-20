import * as send from '../utils/response';
import { create, deleteOne, findAndCount, findOne } from '../database/services';
import Password from '../database/models/Password';
import Todoist from '../database/models/Todoist';
import env from '../config/env';
import { checkPassword, hashPassword } from '../utils/bcrypt';
import { signToken } from '../utils/token';

export const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await findOne(res, Todoist, { where: { username } });
  if (!user) return send.error(res, 401, 'Invalid username or password');
  const pwd = await findOne(res, Password, { where: { todoistId: user?.dataValues.id } });
  const pwdValid = checkPassword(password, pwd.dataValues?.password);
  if (!pwdValid) return send.error(res, 401, 'Invalid username or password');
  const token = signToken(user?.dataValues, res);
  return send.success(res, 200, `Todoist ${username} logged in`, { token });
};

export const signup = async (req, res) => {
  const { firstName, lastName, username } = req.body;
  const user = await findOne(res, Todoist, { where: { username } });
  if (user) return send.error(res, 409, `Todoist ${username} already exists, Log in instead?`);
  const pwd = hashPassword(req.body.password);
  if (pwd) {
    const newTodoist = await create(res, Todoist, { firstName, lastName, username });
    if (newTodoist.dataValues) {
      const newPwd = await create(res, Password, {
        todoistId: newTodoist.dataValues?.id,
        password: pwd,
      });
      if (newPwd.dataValues) return send.success(res, 201, 'Signup successful', { ...newTodoist.dataValues });
    }
  }
  return send.error(res, 500, 'Signup Failed,Please Try again');
};

import jwt from 'jsonwebtoken';
import env from '../config/env';
import { findOne } from '../database/services';
import Todoist from '../database/models/Todoist';
import * as send from '../utils/response';

export const authenticate = async (req, res, next) => {
  const { authorization = '' } = req.headers;
  const token = authorization.split(' ')[1];
  if (!token) return send.error(res, 401, 'Unauthenticated');
  let decoded;
  try {
    decoded = jwt.verify(token, env.JWT_KEY);
  } catch (err) {
    decoded = null;
  }
  if (!decoded) return send.error(res, 401, 'Unauthenticated');
  const user = await findOne(res, Todoist, { where: { username: decoded?.username || '' } });
  if (!user) return send.error(res, 401, 'Unauthenticated');
  req.user = decoded;
  return next();
};

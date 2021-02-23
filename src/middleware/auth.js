import { dbAction } from '../database/services';
import Todoist from '../database/models/Todoist';
import * as send from '../utils/response';
import { verifyToken } from '../utils/jwt';

/** Authenticate the user token
 *
 * @param {object} req request
 * @param {object} res response
 * @param {object} next move on to next middleware
 * @returns {object} Decoded data from payload
 */
const authenticate = async (req, res, next) => {
  const { authorization = '' } = req.headers;
  const token = authorization.split(' ')[1];
  if (!token) return send.error(res, 401, 'Unauthenticated');
  const decoded = verifyToken(token);
  if (!decoded) return send.error(res, 401, 'Unauthenticated');
  const user = await dbAction(Todoist, 'findOne', { where: { username: decoded?.username || '' } });
  if (!user) return send.error(res, 401, 'Unauthenticated');
  req.user = decoded;
  return next();
};

export default authenticate;

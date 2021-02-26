import DBService from '../services/db';
import Todoist from '../database/models/Todoist';
import Response from '../services/response';
import JWTService from '../services/jwt';

export default class Auth {
/** Authenticate the user token
 *
 * @param {object} req request
 * @param {object} res response
 * @param {object} next move on to next middleware
 * @returns {object} Decoded data from payload
 */
  static async authenticate(req, res, next) {
    const { authorization = '' } = req.headers;
    const token = authorization.split(' ')[1];
    if (!token) return Response.error(res, 401, 'Unauthenticated');
    const decoded = JWTService.verifyToken(token);
    if (!decoded) return Response.error(res, 401, 'Unauthenticated');
    const user = await DBService.dbAction(Todoist, 'findOne', { where: { username: decoded?.username || '' } });
    if (!user) return Response.error(res, 401, 'Unauthenticated');
    req.user = decoded;
    return next();
  }
}

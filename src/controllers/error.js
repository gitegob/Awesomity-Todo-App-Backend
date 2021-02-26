import logger from '../services/logger';
import Response from '../services/response';

export default class ErrorController {
  /**
   *
   * @param {object} req request
   * @param {object} res response
   * @returns {object} Error message
   */
  static notFound(req, res) {
    return Response.error(res, 404, 'Sorry, That route is not here!');
  }

  /**
   *
   * @param {object} err error
   * @param {object} req request
   * @param {object} res response
   * @returns {object} Error message
   */
  static handleError(err, req, res) {
    logger.error(err.stack);
    return Response.error(res, err.status || 500, err.message);
  }
}

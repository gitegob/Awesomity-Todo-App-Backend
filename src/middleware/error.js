import log from '../config/debug';
import logger from '../services/logger';
import Response from '../services/response';

export default class ErrorHandler {
  /** Handle invalid route
   *
   * @param {object} req request
   * @param {object} res response
   * @returns {object} Error message
   */
  static notFound(req, res) {
    return Response.error(res, 404, 'Sorry, That route is not here!');
  }

  /** Handle Uncaught exceptions
 *
 * @param {err} err error object
 * @returns Logs the error
 */
  static handleUncaught(err) {
    log.error(err.stack);
    logger.error(err.stack);
    process.exit(1);
  }

  /** Log errors
   *
   * @param {object} err error
   * @param {object} req request
   * @param {object} res response
   * @returns {object} Next middleware
   */
  // eslint-disable-next-line no-unused-vars
  static logErrors(err, req, res, next) {
    log.error(err.stack);
    logger.error(err.stack);
    return next(err);
  }

  /** Handle errors
   *
   * @param {object} err error
   * @param {object} req request
   * @param {object} res response
   * @returns {object} Error message
   */
  // eslint-disable-next-line no-unused-vars
  static handleErrors(err, req, res, next) {
    const status = err.statusCode || err.status;
    return Response.error(res, status || 500, 'Something Failed, Please try again');
  }
}

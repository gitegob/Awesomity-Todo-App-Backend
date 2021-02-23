import logger from '../config/logger';
import * as send from '../utils/response';

/**
 *
 * @param {object} req request
 * @param {object} res response
 * @returns {object} Error message
 */
export const notFound = (req, res) => send.error(res, 404, 'Sorry, That route is not here!');

/**
 *
 * @param {object} err error
 * @param {object} req request
 * @param {object} res response
 * @returns {object} Error message
 */
export const handleError = (err, req, res) => {
  logger.error(err.stack);
  return send.error(res, err.status || 500, err.message);
};

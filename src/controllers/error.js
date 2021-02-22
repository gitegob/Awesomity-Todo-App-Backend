import log from "../config/debug";
import logger from "../config/logger";
import * as send from '../utils/response';

export const notFound = (req, res) => {
  return send.error(res, 404, 'Sorry, That route is not here!');
};
export const handleError = (err, req, res, next) => {
  logger.error(err.stack);
  return send.error(res, err.status || 500, err.message);
};
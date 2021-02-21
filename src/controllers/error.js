import log from "../config/debug";
import * as send from '../utils/response';

export const notFound = (req, res) => {
  return send.error(res, 404, 'Sorry, That route is not here!');
};
export const handleError = (error, req, res, next) => {
  log.error('ERROR => ', error);
  return send.error(res, error.status || 500, `SERVER ERROR: ${error.message}`);
};
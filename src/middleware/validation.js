import { joiVal } from '../utils/joi';
import * as send from '../utils/response';

/** Validate user input
 *
 * @param {object} req request
 * @param {object} res response
 * @param {object} next move on to next middleware
 * @returns {object} next
 */
const validate = (res, body, schema, next) => {
  const error = joiVal(schema, body);
  if (error) return send.error(res, 400, error);
  return next();
};

export default validate;

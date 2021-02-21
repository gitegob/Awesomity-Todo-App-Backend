import { joiVal } from "../utils/joi";
import * as send from '../utils/response';

export const validate = (res, body, schema, next) => {
  const error = joiVal(schema, body);
  if (error) return send.error(res, 400, error);
  return next();
};

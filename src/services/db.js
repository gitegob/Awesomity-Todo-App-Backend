import logger from './logger';
import db from '../database/config';
import env from '../config/env';

export default class DBService {
/** Handle database calls (async)
 *
 * @param {object} model Database model or its instance
 * @param {string} action Action to be performed
 * @param {object} data data or conditions
 * @returns {object} result
 */
  static async dbAction(model, action, data, extra) {
    const result = await model[action](data, extra);
    return result;
  }

  /** Test the database connection (async)
 *
 * @returns {object} result
 */
  static async connectDB() {
    await db.authenticate();
    if (env.NODE_ENV !== 'test') logger.info('Database Connected...');
  }
}

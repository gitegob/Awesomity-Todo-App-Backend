import log from '../config/debug';
import env from '../config/env';
import logger from './logger';
import db from '../database/config';

export default class DBService {
/** Handle database calls
 *
 * @param {object} model Database model or its instance
 * @param {string} action Action to be performed
 * @param {object} data data or conditions
 * @returns {object} result
 */
  static async dbAction(model, action, data) {
    let result;
    try {
      result = await model[action](data);
    } catch (error) {
      log.sqlz(error);
      log.test(error);
      result = null;
    }
    return result;
  }

  /** Test the database connection
 *
 * @returns {object} result
 */
  static async testDB() {
    if (env.NODE_ENV !== 'test') {
      try {
        await db.authenticate();
        logger.info('Database Connected...');
        return log.db('Database Connected...');
      } catch (error) {
        logger.error(error.stack);
        log.error(error.stack);
        return log.error('Error:', error.stack);
      }
    }
    return null;
  }
}

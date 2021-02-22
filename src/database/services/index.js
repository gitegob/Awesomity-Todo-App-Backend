import log from "../../config/debug";
import env from "../../config/env";
import logger from "../../config/logger";
import db from "../config";

export const dbAction = async (model, action, data) => {
  let result;
  try {
    result = await model[action](data);
  } catch (error) {
    log.sqlz(error);
    log.test(error);
    result = null;
  }
  return result;
};

export const testDB = async () => {
  if (env.NODE_ENV !== 'test') {
    try {
      await db.authenticate();
      logger.info('Database Connected...');
      return log.db('Database Connected...');
    } catch (error) {
      logger.error(error.stack);
      return log.error('Error:', error.stack);
    }
  }
  return null;
};

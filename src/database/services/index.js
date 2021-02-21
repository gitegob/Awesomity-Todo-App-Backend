import log from "../../config/debug";
import env from "../../config/env";
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
      return log.db('Database Connected...');
    } catch (error) {
      return log.error('Error:', error);
    }
  }
  return null;
};

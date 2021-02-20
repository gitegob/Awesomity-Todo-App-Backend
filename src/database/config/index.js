import { Sequelize } from 'sequelize';
import { config } from 'dotenv';
import log from '../../config/debug';
import env from '../../config/env';

config();
const db = new Sequelize(env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  native: true,
  logging: (msg) => log.sqlz(msg)
});

export const dbAction = async (res, queryFn) => {
  try {
    return await queryFn;
  } catch (error) {
    log.sqlz(error);
    return error.message || 'Database Error';
  }
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

export default db;

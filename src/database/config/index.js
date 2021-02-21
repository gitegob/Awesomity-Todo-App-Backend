import { Sequelize } from 'sequelize';
import log from '../../config/debug';
import env from '../../config/env';

const dbEnv = () => {
  console.log('NODE_ENV', env.NODE_ENV);
  if (env.NODE_ENV === 'production') return env.DATABASE_URL;
  if (env.NODE_ENV === 'test') return env.TEST_DB_URL;
  return env.DEV_DB_URL;
};

const db = new Sequelize(dbEnv(), {
  dialect: 'postgres',
  protocol: 'postgres',
  native: env.NODE_ENV === 'production' ? true : false,
  logging: (msg) => log.sqlz(msg)
});

export default db;

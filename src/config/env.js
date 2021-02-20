import { config } from 'dotenv';

config();
export default {
  NODE_ENV: process.env.NODE_ENV,
  DATABASE_URL: process.env.NODE_ENV === 'production' ? process.env.DATABASE_URL : process.env.TEST_DB_URL,
  JWT_KEY: process.env.JWT_KEY,
};

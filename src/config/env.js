import { config } from 'dotenv';

config();

const {
  NODE_ENV,
  DATABASE_URL,
  DEV_DB_URL,
  TEST_DB_URL,
  JWT_KEY,
  SERVER_URL,
} = process.env;

export default {
  NODE_ENV,
  DATABASE_URL,
  DEV_DB_URL,
  TEST_DB_URL,
  JWT_KEY,
  SERVER_URL
};

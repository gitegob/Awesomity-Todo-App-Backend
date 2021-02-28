import { createLogger, format, transports } from 'winston';
import env from '../config/env';

const customFormat = format.combine(format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.printf((entry) => `${entry.timestamp} ${entry.level}: ${entry.message}`));

const logger = createLogger({
  format: customFormat,
  transports: [
    new transports.File({ filename: `${__dirname}/../../logs/todo-app-runtime.log` }),
    new transports.File({ filename: `${__dirname}/../../logs/todo-app-errors.log`, level: 'error' }),
  ],
  rejectionHandlers: [
    new transports.File({ filename: `${__dirname}/../../logs/exceptions-rejections.log` }),
  ],
  exceptionHandlers: [
    new transports.File({ filename: `${__dirname}/../../logs/exceptions-rejections.log` }),
  ],
});

if (env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: customFormat,
  }));
}
export default logger;

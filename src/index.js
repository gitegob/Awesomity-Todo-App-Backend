import express, { json, urlencoded } from 'express';
import { config } from 'dotenv';
import ErrorHandler from './middleware/error';
import routes from './routes';
import DBService from './services/db';
import logger from './services/logger';
import limiter from './config/limiter';
import env from './config/env';

config();
const app = express();

// Handle uncaught exceptions and rejections
logger.exceptions.handle();

// MIDDLEWARE
app.enable('trust proxy');
if (env.NODE_ENV === 'production') app.use(limiter);
app.use(require('cors')());
app.use(require('morgan')('dev'));

app.use(json());
app.use(urlencoded({ extended: false }));

// Redirect http to https in production
app.use((req, res, next) => {
  if (req.header('x-forwarded-proto') !== 'https' && (env.NODE_ENV === 'production')) {
    res.redirect(`https://${req.get('host') + req.originalUrl}`);
  }
  next();
});

// TEST DB CONNECTION
DBService.connectDB();

// ROUTING

app.use(routes);

// ERROR HANDLERS
app.use(ErrorHandler.logErrors);
app.use(ErrorHandler.handleErrors);

const server = app.listen(process.env.PORT || 5000, () => {
  logger.info(`Server started on port ${server.address().port}`);
});

export default app;

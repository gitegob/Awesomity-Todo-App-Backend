import express, { json, urlencoded } from 'express';
import { config } from 'dotenv';
import ErrorController from './controllers/error';
import routes from './routes';
import log from './config/debug';
import DBService from './services/db';
import logger from './services/logger';

config();
const app = express();

// MIDDLEWARE
app.use(require('cors')());
app.use(require('morgan')('dev'));

app.use(json());
app.use(urlencoded({ extended: false }));

// TEST DB CONNECTION
DBService.testDB();

// ROUTING

app.use(routes);

// ERROR HANDLER
app.use(ErrorController.handleError);

const server = app.listen(process.env.PORT || 5000, () => {
  logger.info(`Server started on port ${server.address().port}`);
  log.app(`Server running on port ${server.address().port}`);
});

export default app;

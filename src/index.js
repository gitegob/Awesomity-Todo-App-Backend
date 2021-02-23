import express, { json, urlencoded } from 'express';
import { config } from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import { handleError } from './controllers/error';
import routes from './routes';
import log from './config/debug';
import { testDB } from './database/services';
import swaggerSpecs from './config/swagger';
import logger from './config/logger';

config();
const app = express();

// MIDDLEWARE
app.use(require('cors')());
app.use(require('morgan')('dev'));

app.use(json());
app.use(urlencoded({ extended: false }));

// TEST DB CONNECTION
testDB();

// ROUTING

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
app.use(routes);

// ERROR HANDLER
app.use(handleError);

const server = app.listen(process.env.PORT || 5000, () => {
  logger.info(`Server started on port ${server.address().port}`);
  log.app(`Server running on port ${server.address().port}`);
});

export default app;

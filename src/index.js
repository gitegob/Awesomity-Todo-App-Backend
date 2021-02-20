import express, { json, urlencoded } from 'express';
import { config } from 'dotenv';
import { testDB } from './database/config';
import { handleError } from './controllers';
import routes from './routes';
import log from './config/debug';

config();
const app = express();
// MIDDLEWARE
app.use(require('cors')());
app.use(require('morgan')('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
// TEST DB CONNECTION
testDB(app);
// ROUTING
app.use(routes);
// ERROR HANDLER
app.use(handleError);

const server = app.listen(process.env.PORT || 5000, () => {
  log.app(`Server running on port ${server.address().port}`);
});

export default app;
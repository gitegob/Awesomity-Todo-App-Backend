import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import WelcomeController from '../controllers/welcome';
import ErrorHandler from '../middleware/error';
import authRoutes from './auth';
import todoRoutes from './todos';
import LogsController from '../controllers/logs';
import docs from './docs/swagger.json';

const router = Router();

router.get('/', WelcomeController.welcome);
router.use('/api/docs', swaggerUi.serve, swaggerUi.setup(docs));
router.get('/api/logs/:key', LogsController.dlLogs);
router.use('/api/auth', authRoutes);
router.use('/api/todos', todoRoutes);

router.all('/*', ErrorHandler.notFound);

export default router;

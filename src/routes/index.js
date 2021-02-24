import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import welcome from '../controllers/welcome';
import { notFound } from '../controllers/error';
import authRoutes from './auth';
import todoRoutes from './todos';
import dlLogs from '../controllers/logs';
import docs from '../config/docs/swagger.json';

const router = Router();

router.get('/', welcome);
router.get('/api/logs/:key', dlLogs);
router.use('/api/docs', swaggerUi.serve, swaggerUi.setup(docs));
router.use('/api/auth', authRoutes);
router.use('/api/todos', todoRoutes);

router.all('/*', notFound);

export default router;

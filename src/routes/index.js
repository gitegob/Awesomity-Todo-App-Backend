import { Router } from 'express';
import welcome from '../controllers/welcome';
import { notFound } from '../controllers/error';
import authRoutes from './auth';
import todoRoutes from './todos';
import dlLogs from '../controllers/logs';

const router = Router();

router.get('/', welcome);
router.get('/api/logs/:key', dlLogs);
router.use('/api/auth', authRoutes);
router.use('/api/todos', todoRoutes);

router.all('/*', notFound);

export default router;

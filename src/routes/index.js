import { Router } from 'express';
import { notFound, welcome } from '../controllers';
import authRoutes from './auth';
import todoRoutes from './todos';
const router = Router();

router.get('/api', welcome);
router.use('/api/auth', authRoutes);
router.use('/api/todos', todoRoutes);
router.all('/*', notFound);

export default router;
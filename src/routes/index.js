import { Router } from 'express';
import { welcome } from '../controllers/welcome';
import { notFound } from '../controllers/error';
import authRoutes from './auth';
import todoRoutes from './todos';

const router = Router();

router.get('/', welcome);
router.use('/api/auth', authRoutes);
router.use('/api/todos', todoRoutes);

router.all('/*', notFound);



export default router;
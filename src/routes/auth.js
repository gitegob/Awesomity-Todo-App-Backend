import { Router } from 'express';
import { login, signup } from '../controllers/auth';
import { signupVal, loginVal } from '../middleware/validation';

const router = Router();

router.post('/login', loginVal, login);
router.post('/signup', signupVal, signup);

export default router;

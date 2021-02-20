import { Router } from 'express';
import { login, signup } from '../controllers/auth';
import { loginCheck, signupCheck } from '../middleware/check';
import { signupVal, loginVal } from '../middleware/validation';

const router = Router();

router.post('/login', loginVal, loginCheck, login);
router.post('/signup', signupVal, signupCheck, signup);

export default router;

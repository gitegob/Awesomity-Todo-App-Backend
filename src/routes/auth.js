import { Router } from 'express';
import { login, signup } from '../controllers/auth';
import { loginCheck, signupCheck } from '../middleware/check';
import validate from '../middleware/validation';

const router = Router();

router.post('/login',
  (req, res, next) => validate(res, req.body, 'login', next),
  loginCheck,
  login);

router.post('/signup',
  (req, res, next) => validate(res, req.body, 'signup', next),
  signupCheck,
  signup);

export default router;

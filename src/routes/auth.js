import { Router } from 'express';
import AuthController from '../controllers/auth';
import Checker from '../middleware/checker';

const router = Router();

router.post('/login',
  (req, res, next) => Checker.validate(res, req.body, 'login', next),
  Checker.loginCheck,
  AuthController.login);

router.post('/signup',
  (req, res, next) => Checker.validate(res, req.body, 'signup', next),
  Checker.signupCheck,
  AuthController.signup);

export default router;

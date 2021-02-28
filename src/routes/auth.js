import { Router } from 'express';
import AuthController from '../controllers/auth';
import async from '../middleware/async';
import Checker from '../middleware/checker';

const router = Router();

router.post('/login',
  (req, res, next) => Checker.validate(res, req.body, 'login', next),
  async(Checker.loginCheck),
  AuthController.login);

router.post('/signup',
  (req, res, next) => Checker.validate(res, req.body, 'signup', next),
  async(Checker.signupCheck),
  async(AuthController.signup));

export default router;

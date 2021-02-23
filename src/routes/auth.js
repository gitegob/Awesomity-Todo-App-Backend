import { Router } from 'express';
import { login, signup } from '../controllers/auth';
import { loginCheck, signupCheck } from '../middleware/check';
import validate from '../middleware/validation';

/**
 * @swagger
 * components:
 *   schemas:
 *     TodoistSignup:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *           description: The Todoist's First Name.
 *           example: Charles
 *         lastName:
 *           type: string
 *           description: The Todoist's last Name.
 *           example: Ruhahigwa
 *         username:
 *           type: string
 *           description: The Todoist's username.
 *           example: crudahigwa
 *         password:
 *           type: string
 *           description: The Todoist's password.
 *           example: Password
 *     TodoistLogin:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           description: The Todoist's username.
 *           example: crudahigwa
 *         password:
 *           type: string
 *           description: The Todoist's password.
 *           example: Password
 *
*/

const router = Router();

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Log In a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TodoistLogin'
 *     responses:
 *       200:
 *         description: Login Successful
 *
 *       401:
 *         description: Invalid username or password
 *
 *       400:
 *         description: Invalid data entries
 *
*/
router.post('/login',
  (req, res, next) => validate(res, req.body, 'login', next),
  loginCheck,
  login);

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Signup a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TodoistSignup'
 *     responses:
 *       201:
 *         description: Signup successful
 *
 *       409:
 *         description: Todoist already exists
 *
 *       400:
 *         description: Invalid data entries
 *
*/
router.post('/signup',
  (req, res, next) => validate(res, req.body, 'signup', next),
  signupCheck,
  signup);

export default router;

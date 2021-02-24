import { Router } from 'express';
import {
  createTodo, getTodos, getTodo, updateTodo, deleteTodo, exportTodos,
} from '../controllers/todos';
import authenticate from '../middleware/auth';
import { findUserTodo } from '../middleware/check';
import validate from '../middleware/validation';

const router = Router();

router.get('/',
  authenticate,
  (req, res, next) => validate(res, req.query?.s, 'todoSearch', next),
  getTodos);

router.get('/export',
  authenticate,
  (req, res, next) => validate(res, req.query?.s, 'todoSearch', next),
  exportTodos);

router.post('/',
  authenticate,
  (req, res, next) => validate(res, req.body, 'todo', next),
  createTodo);

router.get('/:todoId',
  authenticate,
  (req, res, next) => validate(res, +req.params.todoId, 'todoId', next),
  getTodo);

router.patch('/:todoId',
  authenticate,
  (req, res, next) => validate(res, +req.params.todoId, 'todoId', next),
  (req, res, next) => validate(res, req.body, 'todoUpdate', next),
  findUserTodo,
  updateTodo);

router.delete('/:todoId',
  authenticate,
  (req, res, next) => validate(res, +req.params.todoId, 'todoId', next),
  findUserTodo,
  deleteTodo);

export default router;

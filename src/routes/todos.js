import { Router } from 'express';
import TodosController from '../controllers/todos';
import Auth from '../middleware/auth';
import Checker from '../middleware/checker';

const router = Router();

router.get('/',
  Auth.authenticate,
  (req, res, next) => Checker.validate(res, req.query?.s, 'todoSearch', next),
  TodosController.getTodos);

router.get('/export',
  Auth.authenticate,
  (req, res, next) => Checker.validate(res, req.query?.s, 'todoSearch', next),
  TodosController.exportTodos);

router.post('/',
  Auth.authenticate,
  (req, res, next) => Checker.validate(res, req.body, 'todo', next),
  TodosController.createTodo);

router.get('/:todoId',
  Auth.authenticate,
  (req, res, next) => Checker.validate(res, +req.params.todoId, 'todoId', next),
  TodosController.getTodo);

router.patch('/:todoId',
  Auth.authenticate,
  (req, res, next) => Checker.validate(res, +req.params.todoId, 'todoId', next),
  (req, res, next) => Checker.validate(res, req.body, 'todoUpdate', next),
  Checker.findUserTodo,
  TodosController.updateTodo);

router.delete('/:todoId',
  Auth.authenticate,
  (req, res, next) => Checker.validate(res, +req.params.todoId, 'todoId', next),
  Checker.findUserTodo,
  TodosController.deleteTodo);

export default router;

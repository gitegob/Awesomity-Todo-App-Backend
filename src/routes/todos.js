import { Router } from 'express';
import TodosController from '../controllers/todos';
import async from '../middleware/async';
import Auth from '../middleware/auth';
import Checker from '../middleware/checker';

const router = Router();

router.get('/',
  async(Auth.authenticate),
  (req, res, next) => Checker.validate(res, req.query?.s, 'todoSearch', next),
  async(TodosController.getTodos));

router.post('/',
  async(Auth.authenticate),
  (req, res, next) => Checker.validate(res, req.body, 'todo', next),
  async(TodosController.createTodo));

router.get('/:todoId',
  async(Auth.authenticate),
  (req, res, next) => Checker.validate(res, +req.params.todoId, 'todoId', next),
  async(TodosController.getTodo));

router.patch('/:todoId',
  async(Auth.authenticate),
  (req, res, next) => Checker.validate(res, +req.params.todoId, 'todoId', next),
  (req, res, next) => Checker.validate(res, req.body, 'todoUpdate', next),
  Checker.findUserTodo,
  async(TodosController.updateTodo));

router.delete('/:todoId',
  async(Auth.authenticate),
  (req, res, next) => Checker.validate(res, +req.params.todoId, 'todoId', next),
  Checker.findUserTodo,
  async(TodosController.deleteTodo));

export default router;

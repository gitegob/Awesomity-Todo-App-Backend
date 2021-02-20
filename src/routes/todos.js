import { Router } from 'express';
import { createTodo, getTodos, getTodo, updateTodo, deleteTodo } from '../controllers/todos';
import { authenticate } from '../middleware/auth';
import { findUserTodo } from '../middleware/check';
import { paramtodoIdVal, todoUpdateVal, todoVal } from '../middleware/validation';

const router = Router();

router.get('/', authenticate, getTodos);
router.post('/', authenticate, todoVal, createTodo);
router.get('/:todoId', authenticate, paramtodoIdVal, getTodo);
router.patch('/:todoId', authenticate, paramtodoIdVal, todoUpdateVal, findUserTodo, updateTodo);
router.delete('/:todoId', authenticate, paramtodoIdVal, findUserTodo, deleteTodo);



export default router;

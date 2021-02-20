import { Router } from 'express';
import { createTodo, getTodos, getTodo, updateTodo, deleteTodo } from '../controllers/todos';
import { authenticate } from '../middleware/auth';
import { paramtodoIdVal, todoUpdateVal, todoVal } from '../middleware/validation';

const router = Router();

router.get('/', authenticate, getTodos);
router.post('/', authenticate, todoVal, createTodo);
router.get('/:todoId', authenticate, paramtodoIdVal, getTodo);
router.patch('/:todoId', authenticate, paramtodoIdVal, todoUpdateVal, updateTodo);
router.delete('/:todoId', authenticate, paramtodoIdVal, deleteTodo);



export default router;

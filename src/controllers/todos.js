import { create, deleteOne, findAndCount, findOne, update } from '../database/services';
import Todo from '../database/models/Todo';
import * as send from '../utils/response';

export const getTodos = async (req, res) => {
  const todos = await findAndCount(res, Todo);
  return send.success(res, 200, 'Todos retrieved.', todos);
};
export const getTodo = async (req, res) => {
  const todo = await findOne(res, Todo, { where: { id: req.params.todoId } });
  if (!todo?.dataValues) return send.error(res, 404, 'Todo Not Found');
  return send.success(res, 200, 'Todo retrieved.', todo);
};

export const createTodo = async (req, res) => {
  const { title, description, priority } = req.body;
  const newTodo = await create(res, Todo, {
    title,
    description,
    priority,
    todoistId: req.user.id,
    todoistName: `${req.user.firstName} ${req.user.lastName}`
  });
  if (!newTodo?.dataValues) return send.error(res, 500, 'Todo creation failed');
  return send.success(res, 201, 'Todo created', newTodo.dataValues);
};

export const updateTodo = async (req, res) => {
  const { title, description, priority } = req.body;
  const todo = await findOne(res, Todo, { where: { id: +req.params.todoId, todoistId: req.user.id } });
  console.log(todo.dataValues);
  if (!todo) return send.error(res, 404, 'Todo not found.');
  const updatedTodo = await update(res, todo, {
    title,
    description,
    priority,
    modifiedAt: new Date().toLocaleString()
  });
  return send.success(res, 200, 'Todo updated.', updatedTodo);
};

export const deleteTodo = async (req, res) => {
  const todo = await findOne(res, Todo, { where: { id: +req.params.todoId, todoistId: req.user.id } });
  if (!todo) return send.error(res, 404, 'Todo not found.');
  await deleteOne(res, todo);
  return send.success(res, 200, `Todo with title: ${todo.dataValues.title} deleted.`);
};
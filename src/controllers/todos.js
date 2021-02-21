import { Op } from 'sequelize';
import Todo from '../database/models/Todo';
import { dbAction } from '../database/services';
import * as send from '../utils/response';

export const getTodos = async (req, res) => {
  let conditions = { todoistId: req.user.id };
  if (req.query?.s) conditions = { ...conditions, title: { [Op.iLike]: `%${req.query.s}%` } };
  const todos = await dbAction(Todo, 'findAndCountAll', { order: [["createdAt", "DESC"]], where: conditions });
  return send.success(res, 200, 'Todos retrieved.', todos);
};
export const getTodo = async (req, res) => {
  const todo = await dbAction(Todo, 'findOne', { where: { todoistId: req.user.id, id: req.params.todoId } });
  if (!todo?.dataValues) return send.error(res, 404, 'Todo Not Found');
  return send.success(res, 200, 'Todo retrieved.', todo);
};

export const createTodo = async (req, res) => {
  const { title, description, priority } = req.body;
  const newTodo = await dbAction(Todo, 'create', {
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
  const { __todo: todo } = req;
  const updatedTodo = await dbAction(todo, 'update', {
    title,
    description,
    priority,
    modifiedAt: new Date().toLocaleString()
  });
  return send.success(res, 200, 'Todo updated.', updatedTodo);
};

export const deleteTodo = async (req, res) => {
  const { __todo: todo } = req;
  await dbAction(todo, 'destroy');
  return send.success(res, 200, `Todo with title: ${todo.dataValues.title} deleted.`);
};
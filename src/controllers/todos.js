import path from 'path';
import Todo from '../database/models/Todo';
import DBService from '../services/db';
import CSVService from '../services/csv';
import Response from '../services/response';
import Finder from '../services/finder';

export default class TodosController {
  /** Fetch/Export all todos (async)
   *
   * @param {object} req request
   * @param {object} res response
   * @returns {object} List of todos
   */
  static async getTodos(req, res) {
    const todos = await Finder.findTodos(req);
    if (req.query.exp === 'yes') {
      await CSVService.toCSV(todos);
      return res
        .status(200)
        .download(path.join(`${__dirname}`, '..', '..', 'todos.csv'), 'todos.csv');
    }
    return Response.success(res, 200, 'Todos retrieved.', todos);
  }

  /** Fetch a single Todo (async)
   *
   * @param {object} req request
   * @param {object} res response
   * @returns {object} Single todo
   */
  static async getTodo(req, res) {
    const todo = await DBService.dbAction(Todo, 'findOne', { where: { todoistId: req.user.id, id: req.params.todoId } });
    if (!todo?.dataValues) return Response.error(res, 404, 'Todo Not Found');
    return Response.success(res, 200, 'Todo retrieved.', todo);
  }

  /** Create a todo (async)
   *
   * @param {object} req request
   * @param {object} res response
   * @returns {object} Created Todo
   */
  static async createTodo(req, res) {
    const { title, description, priority } = req.body;
    const newTodo = await DBService.dbAction(Todo, 'create', {
      title,
      description,
      priority,
      todoistId: req.user.id,
      todoistName: `${req.user.firstName} ${req.user.lastName}`,
    });
    if (!newTodo?.dataValues) return Response.error(res, 500, 'Todo creation failed');
    return Response.success(res, 201, 'Todo created', newTodo.dataValues);
  }

  /** Update a todo (async)
   *
   * @param {object} req request
   * @param {object} res response
   * @returns {object} Updated todo
   */
  static async updateTodo(req, res) {
    const { title, description, priority } = req.body;
    const { __todo: todo } = req;
    const updatedTodo = await DBService.dbAction(todo, 'update', {
      title,
      description,
      priority,
      modifiedAt: new Date().toLocaleString(),
    });
    return Response.success(res, 200, 'Todo updated.', updatedTodo);
  }

  /** Delete a todo (async)
   *
   * @param {object} req request
   * @param {object} res response
   * @returns {object} Success
   */
  static async deleteTodo(req, res) {
    const { __todo: todo } = req;
    await DBService.dbAction(todo, 'destroy');
    return Response.success(res, 200, `Todo with title: ${todo.dataValues.title} deleted.`);
  }

  /** Delete all todos (async)
   *
   * @param {object} req request
   * @param {object} res response
   * @returns {object} Success
   */
  static async deleteTodos(req, res) {
    await DBService.dbAction(Todo, 'destroy', { where: { todoistId: req.user.id } });
    return Response.success(res, 200, 'All todos deleted.');
  }
}

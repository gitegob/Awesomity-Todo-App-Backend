import { Op } from 'sequelize';
import Todo from '../database/models/Todo';
import DBService from './db';

export default class Finder {
  /** Find user Todos (async)
   *
   * @param {object} req password
   * @returns {object} List of todos
   */
  static async findTodos(req) {
    let conditions = { todoistId: req.user.id };
    if (req.query?.s) conditions = { ...conditions, title: { [Op.iLike]: `%${req.query.s}%` } };
    const todos = await DBService.dbAction(Todo, 'findAll', { order: [['createdAt', 'DESC']], where: conditions });
    return todos;
  }
}

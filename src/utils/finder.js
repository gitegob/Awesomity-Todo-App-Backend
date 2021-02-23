import { Op } from 'sequelize';
import Todo from "../database/models/Todo";
import { dbAction } from "../database/services";

/** Find user Todos
 * 
 * @param {object} req password
 * @returns {object} List of todos
 */
export const findTodos = async (req) => {
  let conditions = { todoistId: req.user.id };
  if (req.query?.s) conditions = { ...conditions, title: { [Op.iLike]: `%${req.query.s}%` } };
  const todos = await dbAction(Todo, 'findAll', { order: [["createdAt", "DESC"]], where: conditions });
  return todos;
};
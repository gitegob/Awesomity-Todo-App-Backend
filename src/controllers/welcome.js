import { success } from '../utils/response';

/**
 *
 * @param {object} req request
 * @param {object} res response
 * @returns {object} Welcome message
 */
const welcome = (req, res) => success(res, 200, 'Welcome to the TodoApp API!');

export default welcome;

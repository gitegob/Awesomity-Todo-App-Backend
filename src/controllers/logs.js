import env from '../config/env';
import * as send from '../utils/response';

/**
 *
 * @param {object} req request
 * @param {object} res response
 * @returns {object} Logs File download
 */

const dlLogs = (req, res) => {
  if (req.params?.key !== env.APP_ADMIN_SECRET) return send.error(res, 403, 'Unauthorized');
  return res
    .status(200)
    .download(`${__dirname}/../../logs/todo-app-runtime.log`, 'todo-app-runtime.log');
};

export default dlLogs;

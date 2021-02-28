import env from '../config/env';
import Response from '../services/response';

export default class LogsController {
  /** Download logs
   *
   * @param {object} req request
   * @param {object} res response
   * @returns {object} Logs File download
   */

  static dlLogs(req, res) {
    if (req.params?.key !== env.APP_ADMIN_SECRET) return Response.error(res, 403, 'Unauthorized');
    return res
      .status(200)
      .download(`${__dirname}/../../logs/todo-app-runtime.log`, 'todo-app-runtime.log');
  }
}

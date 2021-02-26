import Response from '../services/response';

export default class WelcomeController {
  /**
     *
     * @param {object} req request
     * @param {object} res response
     * @returns {object} Welcome message
     */
  static welcome(req, res) { return Response.success(res, 200, 'Welcome to the TodoApp API!'); }
}

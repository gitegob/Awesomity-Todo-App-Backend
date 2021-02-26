export default class Response {
/** Send a success response
 *
 * @param {object} res response object
 * @param {number} status Status code
 * @param {string} message Message
 * @param {object} data Data to send
 * @returns {object} response
 */
  static success(res, status, message, data) {
    return res.status(status).json({
      status,
      message,
      data: data || null,
    });
  }

  /** Send an error response
 *
 * @param {object} res response object
 * @param {number} status Status code
 * @param {string} error Message
 * @returns {object} response
 */
  static error(res, status, err) {
    return res.status(status).json({
      status,
      error: err,
    });
  }
}

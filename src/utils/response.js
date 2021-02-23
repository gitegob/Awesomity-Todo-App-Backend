/** Send a success response
 * 
 * @param {object} res response object
 * @param {number} status Status code
 * @param {string} message Message
 * @param {object} data Data to send
 * @returns {object} response
 */
export const success = (res, status, message, data) => res.status(status).json({
  status,
  message,
  data: data || null
});

/** Send an error response
 * 
 * @param {object} res response object
 * @param {number} status Status code
 * @param {string} error Message
 * @returns {object} response
 */
export const error = (res, status, error) => res.status(status).json({
  status,
  error,
});
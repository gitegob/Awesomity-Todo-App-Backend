export const success = (res, status, message, data) => res.status(status).json({
  status,
  message,
  data: data || null
});
export const error = (res, status, error) => res.status(status).json({
  status,
  error,
});
// Success response
export const sendSuccess = (
  res,
  data = {},
  message = 'Success',
  statusCode = 200
) => {
  return res.status(statusCode).json({
    success: true,
    data,
    message,
  })
}

// Error response
export const sendError = (
  res,
  message = 'Something went wrong',
  statusCode = 500
) => {
  return res.status(statusCode).json({
    success: false,
    error: message,
    code: statusCode,
  })
}
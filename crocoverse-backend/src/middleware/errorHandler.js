import env from '../config/env.js'
import { sendError } from '../utils/apiResponse.js'

const errorHandler = (err, req, res, next) => {
  // 1. Log full error in development
  if (env.NODE_ENV === 'development') {
    console.error('❌ Error:', err.stack)
  } else {
    console.error('❌ Error:', err.message)
  }

  // 2. Extract status code (fallback to 500)
  const statusCode = err.statusCode || 500

  // 3. Safe error message (hide internals in production)
  const message =
    env.NODE_ENV === 'development'
      ? err.message
      : statusCode === 500
      ? 'Internal Server Error'
      : err.message

  // 4. Send standardized response
  return sendError(res, message, statusCode)
}

export default errorHandler
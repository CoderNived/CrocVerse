import env from '../config/env.js'
import { sendError } from '../utils/apiResponse.js'

const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500
  let message = err.message || 'Something went wrong'

  // 🔹 Handle Mongoose CastError (invalid ObjectId)
  if (err.name === 'CastError') {
    statusCode = 400
    message = `Invalid ${err.path}: ${err.value}`
  }

  // 🔹 Handle Mongoose validation errors
  if (err.name === 'ValidationError') {
    statusCode = 400
    message = Object.values(err.errors)
      .map((val) => val.message)
      .join(', ')
  }

  // 🔹 Handle duplicate key errors (MongoDB)
  if (err.code === 11000) {
    statusCode = 400
    const field = Object.keys(err.keyValue)[0]
    message = `Duplicate value for field: ${field}`
  }

  // 🔹 Logging
  if (env.NODE_ENV === 'development') {
    console.error('❌ Error:', err.stack)
  } else {
    console.error('❌ Error:', message)
  }

  // 🔹 Hide internal errors in production
  if (env.NODE_ENV === 'production' && statusCode === 500) {
    message = 'Internal Server Error'
  }

  return sendError(res, message, statusCode)
}

export default errorHandler
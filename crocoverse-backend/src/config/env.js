import dotenv from 'dotenv'

// 1. Load environment variables
dotenv.config()

// 2. Helper: validate required variables
const requireEnv = (key) => {
  const value = process.env[key]

  if (!value || value.trim() === '') {
    console.error(`❌ Missing required environment variable: ${key}`)
    process.exit(1)
  }

  return value
}

// 3. Helper: parse port safely
const parsePort = (value, fallback = 5000) => {
  const port = Number(value)
  return Number.isInteger(port) && port > 0 ? port : fallback
}

// 4. Build env object
const env = Object.freeze({
  PORT: parsePort(process.env.PORT),
  MONGODB_URI: requireEnv('MONGODB_URI'),
  NODE_ENV: process.env.NODE_ENV?.trim() || 'development',
  ML_SERVICE_URL:
    process.env.ML_SERVICE_URL?.trim() || 'http://localhost:8000',
  FRONTEND_URL:
    process.env.FRONTEND_URL?.trim() || 'http://localhost:5173',
})

// 5. Production safety checks
if (env.NODE_ENV === 'production') {
  if (env.ML_SERVICE_URL.includes('localhost')) {
    console.warn(
      '⚠️ ML_SERVICE_URL is pointing to localhost in production'
    )
  }

  if (env.FRONTEND_URL.includes('localhost')) {
    console.warn(
      '⚠️ FRONTEND_URL is pointing to localhost in production'
    )
  }
}

// 6. Optional: debug log (only in development)
if (env.NODE_ENV === 'development') {
  console.log('🔧 Environment loaded:', {
    PORT: env.PORT,
    NODE_ENV: env.NODE_ENV,
  })
}

export default env
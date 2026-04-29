import dotenv from 'dotenv'

// Load env variables (ensure this runs before anything else uses env)
dotenv.config()

// 1. Define required environment variables
const requiredEnvVars = ['MONGODB_URI']

// 2. Validate required variables (including empty strings)
requiredEnvVars.forEach((key) => {
  const value = process.env[key]

  if (!value || value.trim() === '') {
    console.error(`❌ Missing required environment variable: ${key}`)
    process.exit(1)
  }
})

// 3. Build env object with normalization
const env = Object.freeze({
  PORT: Number(process.env.PORT) || 5000,
  MONGODB_URI: process.env.MONGODB_URI,
  NODE_ENV: process.env.NODE_ENV || 'development',
  ML_SERVICE_URL:
    process.env.ML_SERVICE_URL || 'http://localhost:8000',
  FRONTEND_URL:
    process.env.FRONTEND_URL || 'http://localhost:5173',
})

// 4. Optional: warn if running in production without proper config
if (env.NODE_ENV === 'production') {
  if (env.ML_SERVICE_URL.includes('localhost')) {
    console.warn('⚠️ ML_SERVICE_URL is pointing to localhost in production')
  }
}

export default env
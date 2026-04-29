// 1. Core imports
import express from 'express'

// 2. Security & logging middleware
import helmet from 'helmet'
import cors from 'cors'
import morgan from 'morgan'

// 3. Internal modules
import connectDB from './config/db.js'
import rootRouter from './routes/index.js'
import env from './config/env.js'
import errorHandler from './middleware/errorHandler.js'

// 4. App initialization
const app = express()

// 5. Global middleware (NO business logic)
app.use(helmet())
app.use(cors({ origin: env.FRONTEND_URL }))
app.use(morgan(env.NODE_ENV === 'development' ? 'dev' : 'combined'))
app.use(express.json())

// 6. Routes
app.use('/api', rootRouter)

// 7. Global error handler (MUST be last)
app.use(errorHandler)

// 8. Start server ONLY after DB connection
const startServer = async () => {
  try {
    await connectDB()

    app.listen(env.PORT, () => {
      console.log(`🚀 Server running on port ${env.PORT}`)
    })
  } catch (error) {
    console.error('❌ Failed to start server:', error.message)
    process.exit(1)
  }
}

startServer()
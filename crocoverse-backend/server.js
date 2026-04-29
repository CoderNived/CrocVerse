// 1. Core imports
import express from 'express'
import dotenv from 'dotenv'

// 2. Security & logging middleware
import helmet from 'helmet'
import cors from 'cors'
import morgan from 'morgan'

// 3. Internal modules
import connectDB from './config/db.js'
import rootRouter from './routes/index.js'

// 4. Load environment variables
dotenv.config()

// 5. App initialization
const app = express()

// 6. Global middleware (NO custom logic here)
app.use(helmet())
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

// 7. Routes
app.use('/api', rootRouter)

// 8. Port config
const PORT = process.env.PORT || 5000

// 9. Start server ONLY after DB connection
const startServer = async () => {
  try {
    await connectDB()
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`)
    })
  } catch (error) {
    console.error('❌ Failed to start server:', error.message)
    process.exit(1)
  }
}

startServer()
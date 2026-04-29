import express from 'express'

// Import sub-routers
import speciesRoutes from './species.routes.js'
import mlRoutes from './ml.routes.js'
import dashboardRoutes from './dashboard.routes.js'

// Utils
import { sendSuccess } from '../utils/apiResponse.js'

const router = express.Router()

// Mount feature routes
router.use('/species', speciesRoutes)
router.use('/ml', mlRoutes)
router.use('/dashboard', dashboardRoutes)

// Health check
router.get('/health', (req, res) => {
  return sendSuccess(
    res,
    {
      status: 'ok',
      timestamp: new Date().toISOString(),
    },
    'API is healthy'
  )
})

export default router
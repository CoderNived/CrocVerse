import express from 'express'
import {
  getAggregatedStats,
  getContinentDistribution,
  getConservationBreakdown,
  getObservationTrends,
} from '../controllers/dashboard.controller.js'

const router = express.Router()

router.get('/stats', getAggregatedStats)
router.get('/distribution', getContinentDistribution)
router.get('/conservation', getConservationBreakdown)
router.get('/observations', getObservationTrends)

export default router
import express from 'express'
import {
  weightPredictor,
  ageClassifier,
  conservationPredictor,
  habitatSuitability,
  observationTrend,
  populationRisk,
  speciesIdentifier,
} from '../controllers/ml.controller.js'

const router = express.Router()

router.post('/weight-predictor', weightPredictor)
router.post('/age-classifier', ageClassifier)
router.post('/conservation-predictor', conservationPredictor)
router.post('/habitat-suitability', habitatSuitability)
router.post('/observation-trend', observationTrend)
router.post('/population-risk', populationRisk)
router.post('/species-identifier', speciesIdentifier)

export default router
import express from 'express'
import {
  getAllSpecies,
  getSpeciesById,
  createSpecies,
  updateSpecies,
  deleteSpecies,
} from '../controllers/species.controller.js'

const router = express.Router()

router.get('/', getAllSpecies)
router.get('/:id', getSpeciesById)
router.post('/', createSpecies)
router.put('/:id', updateSpecies)
router.delete('/:id', deleteSpecies)

export default router
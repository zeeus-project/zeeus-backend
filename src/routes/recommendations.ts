import { Router } from 'express'
import { getRecommendations } from '../controllers/recommendations' 

const router = Router()

router.get('/:id/recommendations', getRecommendations)       // GET / = fetch all

export default router


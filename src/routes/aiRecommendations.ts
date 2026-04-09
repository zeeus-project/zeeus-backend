import { Router } from 'express'
import { getAIRecommendations } from '../controllers/aiRecommendations' 

const router = Router()

router.get('/:id/ai-recommendations', getAIRecommendations)       // GET / = fetch all

export default router


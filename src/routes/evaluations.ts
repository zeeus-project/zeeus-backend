import { Router } from 'express'
import { createEvaluation, getEvaluations } from '../controllers/evaluations'
import { checkAuth } from '../middleware/auth'
const router = Router()


router.post('/', checkAuth, createEvaluation)    // POST / = create
router.get('/', checkAuth, getEvaluations)       // GET / = fetch all

export default router
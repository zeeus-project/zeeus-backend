import { Router } from 'express'
import { createEvaluation, getEvaluations , deleteEvaluation } from '../controllers/evaluations'
import { checkAuth } from '../middleware/auth'
const router = Router()


router.post('/', checkAuth, createEvaluation)    // POST / = create
router.get('/', checkAuth, getEvaluations)       // GET / = fetch all
router.delete('/:id', checkAuth, deleteEvaluation) // DELETE /:id = delete specific evaluation



export default router
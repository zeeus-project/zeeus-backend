import { Router } from 'express'
import { getAllEvaluations } from '../controllers/evaluations'
import { getAllUsers } from '../controllers/auth'
import { checkAuth } from '../middleware/auth'
import { checkAdmin } from '../middleware/admin'

const router = Router()

router.get('/evaluations', checkAuth, checkAdmin, getAllEvaluations)
router.get('/users', checkAuth, checkAdmin, getAllUsers)

export default router
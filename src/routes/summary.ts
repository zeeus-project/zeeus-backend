import { Router } from 'express'
import { getSummary } from '../controllers/summary'
import { checkAuth } from '../middleware/auth'
const router = Router()


router.get('/:id/summary', checkAuth, getSummary)       // GET / = fetch all

export default router
import { Router } from 'express'
import { getResults } from '../controllers/results'
import { checkAuth } from '../middleware/auth'

const router = Router()

router.get('/:id/results', checkAuth, getResults)       // GET / = fetch all

export default router


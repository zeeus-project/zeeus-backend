import { Router } from 'express'
import { saveStage2, getStage2 } from '../controllers/stage2'
import { checkAuth } from '../middleware/auth'

const router = Router()


router.post('/:id/stage2', checkAuth, saveStage2)    // POST / = create
router.get('/:id/stage2', checkAuth, getStage2)       // GET / = fetch all

export default router 
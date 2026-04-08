import { Router } from 'express'
import { saveStage1, getStage1 } from '../controllers/stage1'
import { checkAuth } from '../middleware/auth'

const router = Router()


router.post('/:id/stage1', checkAuth, saveStage1)    // POST / = create
router.get('/:id/stage1', checkAuth, getStage1)       // GET / = fetch all

export default router 
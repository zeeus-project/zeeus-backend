import { Router } from 'express'
import { savePrimaryData, getPrimaryData } from '../controllers/primaryData'
import { checkAuth } from '../middleware/auth'

const router = Router()


router.post('/:id/primary', checkAuth, savePrimaryData)    // POST / = create
router.get('/:id/primary', checkAuth, getPrimaryData)       // GET / = fetch all

export default router 
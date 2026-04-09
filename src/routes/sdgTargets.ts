import { Router } from 'express'
import { getSDGTargets } from '../controllers/sdgTargets'
import { checkAuth } from '../middleware/auth'

const router = Router()

router.get('/:id/sdg-targets', checkAuth, getSDGTargets)

export default router
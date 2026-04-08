import { Router } from 'express'
import { saveFinancial, getFinancial } from '../controllers/financial'
import { checkAuth } from '../middleware/auth'

const router = Router()

router.post('/:id/financial', checkAuth, saveFinancial)
router.get('/:id/financial', checkAuth, getFinancial)

export default router
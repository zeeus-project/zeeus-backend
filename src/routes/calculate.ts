import { Router } from 'express'
import { calculateStage1, calculateRisk, calculateOpportunity } from '../controllers/calculate'

const router = Router()

router.post('/stage1', calculateStage1)
router.post('/risk', calculateRisk)
router.post('/opportunity', calculateOpportunity)

export default router
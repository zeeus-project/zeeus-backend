import { Router } from 'express'
import { calculateStage1, calculateRisk, calculateOpportunity, calculateKPI } from '../controllers/calculate'

const router = Router()

router.post('/stage1', calculateStage1)
router.post('/risk', calculateRisk)
router.post('/opportunity', calculateOpportunity)
router.post('/kpi', calculateKPI)

export default router
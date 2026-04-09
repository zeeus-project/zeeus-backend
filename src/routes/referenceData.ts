import { Router } from 'express'
import { getStage1Topics, getStage2Topics } from '../controllers/referenceData'

const router = Router()

router.get('/stage1-topics', getStage1Topics)
router.get('/stage2-topics', getStage2Topics)

export default router
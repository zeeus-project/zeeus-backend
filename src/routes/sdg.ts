import { Router } from 'express'
import { getSDGs} from '../controllers/sdg'
import { checkAuth } from '../middleware/auth'

const router = Router()

router.get('/:id/sdgs', checkAuth, getSDGs)       // GET / = fetch all

export default router 
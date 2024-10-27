
import { Router } from 'express'
import { getAllJobs, saveJob } from '../handlers/Job'

const router = Router()

router.get('/', getAllJobs)
router.post('/', saveJob)

export default router
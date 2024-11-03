import { Router } from 'express'
import { body, param } from 'express-validator'
import { 
    getAllJobRequests, 
    getJobRequestById, 
    saveJobRequest 
} from '../handlers/JobRequest'
import { validateFields } from '../middlewares/validateFields'

const router = Router()

router.get('/', getAllJobRequests)

router.get('/:id',
    param('id').isNumeric().withMessage('id should be a number'),
    param('id').notEmpty().withMessage('id is required'),
    validateFields,
    getJobRequestById
)

router.post('/', 
    body('userId').notEmpty().withMessage('userId field is required'),
    body('userAccountId').notEmpty().withMessage('userAccountId field is required'),
    body('jobId').notEmpty().withMessage('jobId field is required'),
    validateFields,
    saveJobRequest
)

router.put('/', 
    body('id').notEmpty().withMessage('id field is required'),
    body('userId').notEmpty().withMessage('userId field is required'),
    body('userAccountId').notEmpty().withMessage('userAccountId field is required'),
    body('jobId').notEmpty().withMessage('jobId field is required'),
    validateFields,
    saveJobRequest
)


export default router
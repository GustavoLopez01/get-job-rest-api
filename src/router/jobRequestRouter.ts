import { Router } from 'express'
import { body, param } from 'express-validator'
import { 
    getAllJobRequests, 
    getJobRequestById, 
    saveJobRequest 
} from '../handlers/JobRequest'
import { validateFields } from '../middlewares/validateFields'
import { verifyJwt } from '../helpers/Jwt'

const router = Router()

router.get('/', 
    verifyJwt,
    getAllJobRequests
)

router.get('/:id',
    param('id').isNumeric().withMessage('id should be a number'),
    param('id').notEmpty().withMessage('id is required'),
    verifyJwt,
    validateFields,
    getJobRequestById
)

router.post('/', 
    body('userId').notEmpty().withMessage('userId field is required'),
    body('userAccountId').notEmpty().withMessage('userAccountId field is required'),
    body('jobId').notEmpty().withMessage('jobId field is required'),
    verifyJwt,
    validateFields,
    saveJobRequest
)

router.put('/', 
    body('id').notEmpty().withMessage('id field is required'),
    body('userId').notEmpty().withMessage('userId field is required'),
    body('userAccountId').notEmpty().withMessage('userAccountId field is required'),
    body('jobId').notEmpty().withMessage('jobId field is required'),
    verifyJwt,
    validateFields,
    saveJobRequest
)


export default router
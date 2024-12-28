
import { Router } from 'express'
import { body, param } from 'express-validator'
import { 
    deleteById,
    getAllJobs, 
    getJobById, 
    getJobsByUserId, 
    saveJob, 
    updateJob
} from '../handlers/Job'
import { validateFields } from '../middlewares/validateFields'
import { verifyJwt } from '../helpers/Jwt'

const router = Router()

router.get('/', 
    verifyJwt,
    getAllJobs
)

router.get('/get-vacancies',
    verifyJwt,
    getJobsByUserId
)

router.get('/:id',
    param('id').isNumeric().withMessage('id should be a number'),
    verifyJwt,
    validateFields,
    getJobById
)

router.post('/',
    body('name').notEmpty().withMessage('name field is required'),
    body('description').notEmpty().withMessage('description field is required'),
    verifyJwt,
    validateFields,
    saveJob
)

router.put('/',
    body('name').notEmpty().withMessage('name field is required'),
    body('description').notEmpty().withMessage('description field is required'),
    body('active').notEmpty().withMessage('active field is required'),
    verifyJwt,
    validateFields,
    updateJob
)

router.delete('/:id',
    param('id').isNumeric().withMessage('id should be a number'),
    verifyJwt,
    validateFields,
    deleteById,
)


export default router
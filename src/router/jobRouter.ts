
import { Router } from 'express'
import { body, param } from 'express-validator'
import { getAllJobs, getJobById, saveJob, updateJob } from '../handlers/Job'
import { validateFields } from '../middlewares/validateFields'

const router = Router()

router.get('/', getAllJobs)

router.get('/:id',
    param('id')
        .isNumeric()
        .withMessage('Id should be a number'),
    validateFields,
    getJobById
)

router.post('/',
    body('name').notEmpty().withMessage('name field is required'),
    body('description').notEmpty().withMessage('description field is required'),
    validateFields,
    saveJob
)

router.put('/',
    body('name').notEmpty().withMessage('name field is required'),
    body('description').notEmpty().withMessage('description field is required'),
    body('active').notEmpty().withMessage('active field is required'),
    validateFields,
    updateJob
)

export default router


import { Router } from 'express'
import { verifyJwt } from '../helpers/Jwt'
import { 
    getAllRoles, 
    getRoleById, 
    saveRole
} from '../handlers/Role'
import { body, param } from 'express-validator'
import { validateFields } from '../middlewares/validateFields'

const router = Router()

router.get('/',
    verifyJwt,
    getAllRoles
)

router.get('/:id',
    param('id').isNumeric().withMessage('Id should be a number'),
    verifyJwt,
    validateFields,
    getRoleById
)

router.post('/', 
    body('name').notEmpty().withMessage('name field is required'),
    body('description').notEmpty().withMessage('description field is required'),
    verifyJwt,
    validateFields,
    saveRole
)

router.put('/', 
    body('name').notEmpty().withMessage('name field is required'),
    body('description').notEmpty().withMessage('description field is required'),
    verifyJwt,
    validateFields,
    saveRole
)

export default router
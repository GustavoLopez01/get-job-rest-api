import { Router } from 'express'
import { body, param } from 'express-validator'
import { 
    getAllUsers,
    getAllUsersAccounts,
    getUserById,
    saveUser,
    updateUser
} from '../handlers/User'
import { validateFields } from '../middlewares/validateFields'

const router = Router()

router.get('/', getAllUsers)
router.get('/accounts', getAllUsersAccounts)

router.get('/:id', 
    param('id').isNumeric().withMessage('Id should be a number'),
    param('id').custom((id) => (id <= 0)).withMessage('Id should be greather than zero'),
    validateFields,
    getUserById
)

router.post('/', 
    body('username').notEmpty().withMessage('username field is required'),
    body('email').notEmpty().withMessage('email field is required'),
    body('password').notEmpty().withMessage('password field is required'),
    body('gender').notEmpty().withMessage('gender field is required'),
    body('age').notEmpty().withMessage('age field is required'),
    validateFields,
    saveUser
)

router.put('/', 
    body('id').notEmpty().withMessage('id field is required'),
    body('username').notEmpty().withMessage('username field is required'),
    body('email').notEmpty().withMessage('email field is required'),
    body('password').notEmpty().withMessage('password field is required'),
    body('gender').notEmpty().withMessage('gender field is required'),
    body('age').notEmpty().withMessage('age field is required'),
    validateFields,
    updateUser
)


export default router
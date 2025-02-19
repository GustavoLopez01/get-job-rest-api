import { Router } from 'express'
import { body, param } from 'express-validator'
import { 
    getAllUsers,
    getAllUsersAccounts,
    getUser,
    getUserById,
    saveUser,
    updateUser
} from '../handlers/User'
import { validateFields } from '../middlewares/validateFields'
import { verifyJwt } from '../helpers/Jwt'

const router = Router()

router.get('/', 
    verifyJwt, 
    getAllUsers
)

router.get('/accounts', 
    verifyJwt, 
    getAllUsersAccounts
)

router.get('/get-user', 
    verifyJwt,
    getUser
)

router.get('/:id', 
    param('id').isNumeric().withMessage('Id should be a number'),
    param('id').custom((id) => {
        if(Number(id) <= 0)  return false
        return true
    }).withMessage('Id should be greather than zero'),
    verifyJwt,
    validateFields,
    getUserById
)

router.post('/', 
    body('name').notEmpty().withMessage('El nombre es requerido'),
    body('lastName').notEmpty().withMessage('El apellido es requerido'),
    body('email').notEmpty().withMessage('El correo electrónico es requerido'),
    body('password').notEmpty().withMessage('La contraseña es requerida'),
    body('roleId').notEmpty().withMessage('El tipo de usuario es requerido'),
    validateFields,
    saveUser
)

router.put('/', 
    body('id').notEmpty().withMessage('id field is required'),
    body('name').notEmpty().withMessage('El nombre es requerido'),
    body('lastName').notEmpty().withMessage('El apellido es requerido'),
    body('email').notEmpty().withMessage('El correo electrónico es requerido'),
    body('password').notEmpty().withMessage('La contraseña es requerida'),
    body('roleId').notEmpty().withMessage('El tipo de usuario es requerido'),
    body('gender').notEmpty().withMessage('El tipo de usuario es requerido'),
    body('age').notEmpty().withMessage('El tipo de usuario es requerido'),
    body('isVerified').notEmpty().withMessage('El tipo de usuario es requerido'),
    verifyJwt,
    validateFields,
    updateUser
)


export default router
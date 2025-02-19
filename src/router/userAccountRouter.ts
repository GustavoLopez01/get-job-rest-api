
import Router from 'express'
import { body } from 'express-validator'
import { getAll, updateUserAccount } from '../handlers/UserAccount'
import { verifyJwt } from '../helpers/Jwt'
import { validateFields } from '../middlewares/validateFields'

const router = Router()

router.get('/',
  verifyJwt,
  getAll
)

router.put('/',
  body('gender').notEmpty().withMessage('El genero es requerido'),
  body('age').notEmpty().withMessage('La edad es requerida'),
  body('userId').notEmpty().withMessage('El id del usaurio es requerido'),
  body('verifyToken').notEmpty().withMessage('El token de verificación es necesario'),
  validateFields,
  updateUserAccount
)


export default router
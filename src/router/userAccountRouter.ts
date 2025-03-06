
import Router from 'express'
import { body, param } from 'express-validator'
import {
  getAll,
  getUserCV,
  updateByVerifyToken,
  updateUserAccount,
  uploadCV
} from '../handlers/UserAccount'
import { verifyJwt } from '../helpers/Jwt'
import { validateFields } from '../middlewares/validateFields'
import upload from '../documents'

const router = Router()

router.get('/',
  verifyJwt,
  getAll
)

router.put('/',
  body('gender').notEmpty().withMessage('El genero es requerido'),
  body('age').notEmpty().withMessage('La edad es requerida'),
  body('userId').notEmpty().withMessage('El id del usuario es requerido'),
  body('verifyToken').notEmpty().withMessage('El token de verificación es necesario'),
  verifyJwt,
  validateFields,
  updateUserAccount
)

router.put('/verify/:verifyToken',
  param('verifyToken').notEmpty().withMessage('El token es requerido'),
  verifyJwt,
  validateFields,
  updateByVerifyToken
)

router.put('/upload-cv',
  verifyJwt,
  upload.single('file'),
  uploadCV
)

router.get('/cv/:userId',
  param('userId').notEmpty().withMessage('El id de usuario es requerido'),
  verifyJwt,
  validateFields,
  getUserCV
)



export default router
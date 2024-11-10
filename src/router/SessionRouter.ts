import { Router } from 'express'
import { login, logout } from '../handlers/Session'

const router = Router()

router.post('/login', login)

router.post('/logout', logout)

export default router
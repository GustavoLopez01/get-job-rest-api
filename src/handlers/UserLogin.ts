import { Request, Response } from 'express'
import { decodeJwt, generateJwt } from '../helpers/Jwt'
import { getUserByEmail, validateEncryptString } from '../helpers/User'
import UserAccount from '../models/UserAccount.model'
import User from '../models/User.model'
import Role from '../models/Role.model'

export const login = async (req: Request, res: Response) => {
    try {
        const token = generateJwt(req.body)
        const { email, password } = req.body
        const user = await User.findOne({
            where: { email },
            include: [Role],
        })

        if (token && user.id) {
            const validatePassword = validateEncryptString(password, user.password)
            
            if (user && validatePassword) {
                await UserAccount.update({
                    isLogged: true
                }, {
                    where: { id: user.id }
                })

                res.status(200).json({
                    token,
                    role: user.role
                })
                return
            }
        }
        res.status(404).json({
            error: true,
            message: `Verify email and password`
        })
    } catch (error) {
        console.log(error);
        res.status(404).json({
            error: true,
            message: `Verify email and password`
        })
    }
}

export const logout = async (req: Request, res: Response) => {
    try {
        const { email } = decodeJwt(req.headers.authorization?.trim())
        const user = await getUserByEmail({ email })

        if (user) {
            await UserAccount.update({
                isLogged: false
            }, {
                where: { id: user.id }
            })

            res.json({
                success: true,
                message: 'User was logged out'
            })
            return
        }
        
        res.status(404).json({
            success: false,
            message: `No exists user with email ${email}`
        })
    } catch (error) {
        console.log(error);
    }
}
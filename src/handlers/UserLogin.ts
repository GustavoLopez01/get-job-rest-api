import { Request, Response } from 'express'
import { generateJwt } from '../helpers/Jwt'
import { getUserByEmail } from '../helpers/User'
import UserAccount from '../models/UserAccount.model'

export const login = async (req: Request, res: Response) => {
    try {
        const token = generateJwt(req.body)
        const email = req.body.email
        if(token) {
            const user = await getUserByEmail({ email })
            if(user) {
                await UserAccount.update({ 
                    isLogged: true
                 }, {
                    where: { id: user.id }
                 })
            }

            res.status(200).json({ token })
            return
        }
    } catch (error) {
        console.log(error);
    }
}

export const logout = async (req: Request, res: Response) => {
    try {
        const { email } = req.body

        if(email) {
            const user = await getUserByEmail({ email })
            if(user) {
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
        }
        res.status(404).json({
            success: false,
            message: `No exists user with email ${email}`
        })
    } catch (error) {
        console.log(error);
    }
}
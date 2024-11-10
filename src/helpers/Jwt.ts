import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import type { UserLogin } from '../types'

export const generateJwt = (user: UserLogin) => {
    try {
        return jwt.sign({ data: user.username },
            process.env.PRIVATE_KEY_TOKEN, {
            expiresIn: '1h'
        })
    } catch (error) {
        console.log(error)
    }
}

export const verifyJwt = (req: Request, res: Response, next: NextFunction) => {
    try {
        const userToken = req.headers.authorization?.split(" ")[1].trim()
        return jwt.verify(
            userToken, 
            process.env.PRIVATE_KEY_TOKEN, 
            function (err, decode) {
            if(err) {
                res.json({ 
                    error: true,
                    message: 'Token is not valid',
                })
                return
            }
            next()
        })
    } catch (error) {        
        console.log(error);
    }
}
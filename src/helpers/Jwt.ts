import jwt from 'jsonwebtoken'
import { jwtDecode } from 'jwt-decode'
import { Request, Response, NextFunction } from 'express'
import type { UserLogin } from '../types'

export const generateJwt = (user: UserLogin) => {
    try {
        return jwt.sign({ email: user.email },
            process.env.PRIVATE_KEY_TOKEN, {
            expiresIn: '1h'
        })
    } catch (error) {
        console.log(error)
    }
}

export const verifyJwt = (req: Request, res: Response, next: NextFunction) => {
    try {        
        let userToken = req.headers.authorization?.trim() || ''
        if(userToken.includes('Bearer')) {
            userToken = userToken.split(" ")?.[1]
        }
                
        return jwt.verify(
            userToken, 
            process.env.PRIVATE_KEY_TOKEN, 
            function (err, decode) {
            if(err) {
                res.json({ 
                    error: true,
                    message: 'Token is not valid',
                    isInvalidToken: true
                })
                return
            }
            next()
        })
    } catch (error) {        
        console.log(error);
    }
}

export const decodeJwt = (token: string) => {
    try {
        const decode = jwtDecode<UserLogin>(token)
        return decode
    } catch (error) {
        console.log(error);
    }
}
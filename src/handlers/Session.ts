import { Request, Response } from 'express'
import { generateJwt } from '../helpers/Jwt';

export const login = async (req: Request, res: Response) => {
    try {
        const token = generateJwt(req.body)
        res.json({ token })
    } catch (error) {
        console.log(error);
    }
}

export const logout = async (req: Request, res: Response) => {
    try {
        
    } catch (error) {
        console.log(error);
    }
}
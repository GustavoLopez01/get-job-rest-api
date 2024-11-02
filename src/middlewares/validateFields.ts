
import { Request, Response, NextFunction} from 'express'
import { validationResult } from 'express-validator'

export const validateFields = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            res.json({
                message: 'Exist errors',
                errors: errors.array().map((error) => error.msg)
            })
            return
        }
        next()
    } catch (error) {
        console.log(error);
    }
}
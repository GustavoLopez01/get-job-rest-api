
import { Request, Response, NextFunction} from 'express'
import { validationResult } from 'express-validator'

export const validateFields = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req)
        console.log(errors);
        if(!errors.isEmpty()) {
            res.json({
                message: 'Exist errors',
                errors: errors.array().map((error) => error.msg)
            })
        }
        next()
    } catch (error) {
        console.log(error);
    }
}
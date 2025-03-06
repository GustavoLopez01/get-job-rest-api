import { Request, Response, NextFunction } from 'express'
import { decodeJwt } from '../helpers/Jwt';
import User from '../models/User.model';
import UserAccount from '../models/UserAccount.model';

export const getUserByRequest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = decodeJwt(req.headers.authorization.trim())
    const user = await User.findOne({
      where: { email },
      include: [UserAccount]
    })

    if (!user) {
      res.json(404).json({
        success: false,
        message: `No existe usuario con email ${email}`
      })
      return
    }

    req.body.userId = user.id
    req.body.userAccountId = user.userAccount.id
    next()
  } catch (error) {
    console.error(error);
  }
}
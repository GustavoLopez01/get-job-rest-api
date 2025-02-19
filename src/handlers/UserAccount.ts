import { Request, Response } from 'express'
import UserAccount from '../models/UserAccount.model'
import User from '../models/User.model'

export const getAll = async (req: Request, res: Response) => {
  try {
    const response = await UserAccount.findAll()

    if (Array.isArray(response)) {
      res.json({
        success: true,
        data: response
      })
      return
    }

    res.json({
      success: true,
      data: []
    })
  } catch (error) {
    console.log(error);
  }
}

export const updateUserAccount = async (req: Request, res: Response) => {
  try {
    const {
      gender,
      age,
      userId,
      verifyToken
    } = req.body

    const existUser = await User.findByPk(userId)

    if (existUser) {
      await UserAccount.update({
        gender,
        age,
        userId,
        verifyToken
      }, {
        where: { userId: existUser.id }
      })

      res.json({
        success: true,
        message: `Se actualizo correctamente la cuenta del usuario con email ${existUser.email}`
      })
      return
    }

    res.json({
      success: false,
      message: `No existe usuario con id ${userId}`
    })
  } catch (error) {
    console.log(error);
  }
}
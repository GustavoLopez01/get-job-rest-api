import { Request, Response } from 'express'
import UserAccount from '../models/UserAccount.model'
import User from '../models/User.model'
import sendEmail from '../helpers/SendEmail'

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
    const existUserAccount = await UserAccount.findOne(
      { where: userId }
    )

    if (existUser && existUserAccount) {
      await UserAccount.update({
        gender,
        age,
        userId,
        verifyToken
      }, {
        where: { userId: existUser.id }
      })

      if (!existUserAccount.verifyToken) {
        console.log("correo enviado");
        await sendEmail(verifyToken)
      }

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

export const updateByVerifyToken = async (req: Request, res: Response) => {
  try {
    const { verifyToken } = req.params

    const userAccount = await UserAccount.findOne({
      where: { verifyToken }
    })

    if (!userAccount) {
      res.json({
        success: false,
        message: 'No existe usuario con el token enviado'
      })
      return
    }

    if (userAccount && !userAccount.isVerified) {
      await UserAccount.update({
        ...userAccount,
        isVerified: true
      }, {
        where: { id: userAccount.id }
      })

      res.json({
        success: true,
        message: 'Usuario verificado correctamente'
      })
      return
    }

    res.json({
      success: false,
      message: 'El usaurio ya se encuentra verificado'
    })
  } catch (error) {
    console.log(error);
  }
}
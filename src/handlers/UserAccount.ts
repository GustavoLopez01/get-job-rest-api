import { Request, Response } from 'express'
import UserAccount from '../models/UserAccount.model'
import User from '../models/User.model'
import sendEmail from '../helpers/SendEmail'
import { decodeJwt } from '../helpers/Jwt'
import { getUserByEmail } from '../helpers/User'
import { getDocumentByName } from '../documents/documents'

export const getAll = async (req: Request, res: Response) => {
  try {
    const response = await UserAccount.findAll()

    if (Array.isArray(response)) {
      res.status(200).json({
        success: true,
        data: response
      })
      return
    }

    res.status(200).json({
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
        await sendEmail(verifyToken)
      }

      res.status(200).json({
        success: true,
        message: `Se actualizo correctamente la cuenta del usuario con email ${existUser.email}`
      })
      return
    }

    res.status(200).json({
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
      res.status(200).json({
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

      res.status(200).json({
        success: true,
        message: 'Usuario verificado correctamente'
      })
      return
    }

    res.status(200).json({
      success: false,
      message: 'El usaurio ya se encuentra verificado'
    })
  } catch (error) {
    console.log(error);
  }
}

export const uploadCV = async (req: Request, res: Response) => {
  try {
    if (req.file) {
      const { email } = decodeJwt(req.headers.authorization.trim())
      const user: User = await getUserByEmail({ email })
      const userAccount = await UserAccount.findOne({
        where: { userId: user.id }
      })

      userAccount.cv = req.file.filename
      await userAccount.save()

      res.status(200).json({
        success: true,
        message: 'Se actualizo correctamente el cv del usuario'
      })
      return
    }

    res.status(200).json({
      success: false,
      message: 'No se envió ningun documento para actualizar el cv'
    })
  } catch (error) {
    console.log(error);
  }
}

export const getUserCV = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const userAccount = await UserAccount.findOne({
      where: { userId }
    })

    if (userAccount) {
      const document = await getDocumentByName(userAccount.cv)
      // res.status(200).json({
      //   success: true,
      //   document
      // })

      res.status(200).sendFile(document.document)
      return
    }

    res.status(404).json({
      success: false,
      message: `No existe cuenta de usaurio con userId ${userId}`
    })
  } catch (error) {
    console.log(error);
  }
}
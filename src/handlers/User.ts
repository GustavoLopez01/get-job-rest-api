import { Request, Response } from 'express'
import User from "../models/User.model";
import UserAccount from '../models/UserAccount.model';
import {
  encryptString,
  getUserByEmail,
  validateEncryptString
} from '../helpers/User';
import { decodeJwt } from '../helpers/Jwt';
import Role from '../models/Role.model';

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll({
      include: [UserAccount]
    })
    if (Array.isArray(users)) {
      res.status(200).json(users)
      return
    }
    res.status(200).json([])
  } catch (error) {
    console.log(error);
  }
}

export const getAllUsersAccounts = async (req: Request, res: Response) => {
  try {
    const accounts = await UserAccount.findAll()
    if (Array.isArray(accounts)) {
      res.status(200).json(accounts)
      return
    }
    res.status(200).json([])
  } catch (error) {
    console.log(error);
  }
}

export const getUserById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const user = await User.findByPk(id, {
      include: [UserAccount, Role]
    })

    if (user) {
      res.status(200).json(user)
      return
    }
    res.status(404).json({
      message: `No exists user with id ${id}`
    })
  } catch (error) {
    console.log(error);
  }
}

export const saveUser = async (req: Request, res: Response) => {
  try {
    const {
      name,
      lastName,
      email,
      password,
      roleId
    } = req.body

    const alreadyExistEmail = await getUserByEmail({ email })
    if (alreadyExistEmail) {
      res.status(200).json({
        success: false,
        message: `El correo ${email} ya existe.`
      })
      return
    }

    const encriptedPassword = encryptString(password)
    const user = await User.create({
      name,
      lastName,
      email,
      roleId,
      password: encriptedPassword
    })

    if (user) {
      await UserAccount.create({ userId: user.id })
    }
    res.status(200).json(user)
  } catch (error) {
    console.log(error);
  }
}

export const updateUser = async (req: Request, res: Response) => {
  try {
    const {
      roleId,
      name,
      lastName,
      email,
      password,
      gender,
      age,
      id
    } = req.body

    // Validar que exista el coreo electrónico
    const existUser = await getUserByEmail({ email })
    if (!existUser) {
      res.status(200).json({
        success: false,
        message: `El correo ${email} no existe en la base de datos.`
      })
      return
    }

    // Validar que la contraseña sea correcta
    const isValidPassword = validateEncryptString(password, existUser.password)
    if (!isValidPassword) {
      res.status(200).json({
        success: false,
        message: 'La contraseña no coincide con la registrada.'
      })
      return
    }

    const user = await User.update({
      name,
      lastName,
      email,
      roleId,
      password: existUser.password
    }, {
      where: { id }
    })

    if (user) {
      await UserAccount.update({
        gender,
        age,
        userId: id
      }, {
        where: { userId: id }
      })
      
      res.status(200).json({
        success: true,
        message: 'Usuario actualizado correctamente.'
      })
    }
  } catch (error) {
    console.log(error);
  }
}

export const getUser = async (req: Request, res: Response) => {
  try {
    const { email } = decodeJwt(req.headers.authorization.trim())
    const user: User = await getUserByEmail({ email })
    if (user.id) {
      res.status(200).json(user)
      return
    }
    res.status(404).json({
      error: false,
      message: `User with email: ${email} not exists`
    })
  } catch (error) {
    console.log(error);
  }
}
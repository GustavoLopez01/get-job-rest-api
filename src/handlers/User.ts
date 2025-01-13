import { Request, Response } from 'express'
import User from "../models/User.model";
import UserAccount from '../models/UserAccount.model';
import { encryptString, getUserByEmail } from '../helpers/User';
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
            username,
            email,
            password,
            gender,
            age,
            fullName,
            roleId
        } = req.body

        const alreadyExistEmail = await getUserByEmail({ email })
        if (alreadyExistEmail) {
            res.status(200).json({
                success: false,
                message: `Email ${email} already exists`
            })
            return
        }

        const encriptedPassword = encryptString(password)
        const user = await User.create({
            username,
            email,
            fullName,
            roleId,
            password: encriptedPassword
        })
        if (user) {
            await UserAccount.create({
                gender,
                age,
                userId: user.id
            })
            res.status(200).json(user)
            return
        }
    } catch (error) {
        console.log(error);
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        const {
            username,
            email,
            password,
            gender,
            age,
            id
        } = req.body

        const alreadyExistEmail = await getUserByEmail({ email })
        if (alreadyExistEmail) {
            res.status(200).json({
                success: false,
                message: `Email ${email} already exists`
            })
            return
        }

        const user = await User.update({
            username,
            email,
            password
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
            res.status(200).json(user)
            return
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
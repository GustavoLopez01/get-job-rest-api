import { Request, Response } from 'express'
import Role from '../models/Role.model';

export const getAllRoles = async (req: Request, res: Response) => {
    try {
        const roles = await Role.findAll()
        if(Array.isArray(roles)) {
            res.status(200).json(roles)
            return
        }
        res.status(200).json([])
    } catch (error) {
        console.log(error);
    }
}

export const getRoleById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const role = await Role.findByPk(id)
        if(role.id) {
            res.status(200).json(role)
            return
        }
        res.status(404).json({
            error: true,
            message: `No exists role with id ${id}`
        })
    } catch (error) {
        console.log(error);
    }
}

export const saveRole = async (req: Request, res: Response) => {
    try {
        const body = req.body
        const role = await Role.create(body)

        if(role.id) {
            res.status(201).json(role)
            return
        }
    } catch (error) {
        console.error(error)
    }
}

export const updateRole = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const body = req.body

        const existRole = await Role.findByPk(id)

        if(!existRole) {
            res.status(404).json({
                error: true,
                message: `No exists role with id ${id}`
            })
            return
        }

        const role = await Role.update({ ...body }, {
            where: { id }
        })

        res.status(200).json(role)
    } catch (error) {
        console.error(error)
    }
}
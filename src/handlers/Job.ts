import { Request, Response} from 'express'
import Job from '../models/Job.model';
import User from '../models/User.model';
import { decodeJwt } from '../helpers/Jwt';
import { getUserByEmail } from '../helpers/User';

export const getAllJobs = async (req: Request, res: Response) => {
    try {
        const jobs = await Job.findAll()
        if(Array.isArray(jobs)) {
            res.status(200).json(jobs)
            return 
        }

        res.status(200).json([])
    } catch (error) {
        console.log(error);
    }
}

export const getJobById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const job = await Job.findByPk(id)

        if(job) {
            res.status(200).json(job)
            return
        }
        res.status(404).json({ message: `No exists job with id ${id}` })
    } catch (error) {
        console.log(error);
    }
}

export const saveJob = async (req: Request, res: Response) => {
    try {
        const { email } = decodeJwt(req.headers.authorization?.trim())
        const user: User = await getUserByEmail({ email })

        const job = await Job.create({
            ...req.body,
            userId: user.id
        })
        
        if(job) {
            res.status(200).json(job)
            return
        }
        res.json(req.body)
    } catch (error) {
        console.log(error);
    }
}

export const updateJob = async (req: Request, res: Response) => {
    try {
        const id = req.body.id;
        const existJob = await Job.findByPk(id)

        if(existJob) {
            const [updatedCount] = await Job.update({ ...req.body },
            { where: { id } })

            if(updatedCount > 0) {
                res.status(200).json(req.body)
                return
            }
        }

        res.json({
            message: `No exists Job with id ${id}`
        })
    } catch (error) {
        console.log(error);
    }
}

export const getJobsByUserId = async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization?.trim()
        const { email } = decodeJwt(token)        
        const user = await User.findOne({
            where: { email }
        })

        if(!user) {
            res.status(404).json({
                error: true,
                message: `User no exists with email ${email}`
            })
            return
        }
        
        const jobs = await Job.findAll({
            where: { userId: user.id }
        })

        if(Array.isArray(jobs)) {
            res.status(200).json(jobs)
            return
        }

        res.status(200).json([])
    } catch (error) {
        console.log(error);
    }
}

export const deleteById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const job = await Job.findByPk(id)
        if(!job) {
            res.status(404).json({
                error: true,
                message: `No exists job with id ${id}`
            })
            return
        }

        await job.destroy()
        res.status(200).json({
            success: true,
            message: `Job has been successfully deleted`
        })
    } catch (error) {
        console.log(error);
    }
}
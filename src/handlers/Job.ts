import { Request, Response} from 'express'
import Job from '../models/Job.model';

export const getAllJobs = async (req: Request, res: Response) => {
    try {
        const jobs = await Job.findAll()
        if(Array.isArray(jobs)) {
            res.status(200).json(jobs)
            return 
        }

        res.status(404).json([])
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
        const job = await Job.create(req.body)
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
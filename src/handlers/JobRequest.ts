import { Request, Response } from 'express'
import JobRequest from '../models/JobRequest.model'
import Job from '../models/Job.model'
import User from '../models/User.model'
import UserAccount from '../models/UserAccount.model'

export const getAllJobRequests =  async (req: Request, res: Response) => {
    try {        
        const requests = await JobRequest.findAll()
        if(Array.isArray(requests)) {
            res.status(200).json(requests)
            return
        }
        res.status(200).json([])
    } catch (error) {
        console.log(error);
    }
}

export const getJobRequestById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params        
        const jobRequest = await JobRequest.findByPk(id, {
            include: [Job, User, UserAccount]
        })
        
        if(!jobRequest) {
            res.status(404).json({
                message: `No exists register with id ${id}`
            })
            return
        }
        res.status(200).json(jobRequest)
    } catch (error) {
        console.log(error);
    }
}

export const saveJobRequest = async (req: Request, res: Response) => {
    try {
        const jobRequest = await JobRequest.create(req.body)
        if(!jobRequest) {
            res.status(500).json({
                message: 'an error occurred while saving the information'
            })
            return
        }

        res.status(201).json(jobRequest)
        return
    } catch (error) {
        console.log(error);
    }
}

export const updateJobRequest = async (req: Request, res: Response) => {
    try {
        const id = req.body
        const existJobRequest = await JobRequest.findByPk(id)
        if(!existJobRequest) {
            res.status(404).json({
                message: `No exists register with id ${id}`
            })
            return
        }
        
        const jobRequest = await JobRequest.update({ ...req.body },
            { where: id }
        )

        if(jobRequest) {
            res.status(200).json(jobRequest)
            return
        }
    } catch (error) {
        console.log(error);
    }
}
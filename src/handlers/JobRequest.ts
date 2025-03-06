import { Request, Response } from 'express'
import JobRequest from '../models/JobRequest.model'
import Job from '../models/Job.model'
import User from '../models/User.model'
import UserAccount from '../models/UserAccount.model'

export const getAllJobRequests = async (req: Request, res: Response) => {
  try {
    const requests = await JobRequest.findAll()
    if (Array.isArray(requests)) {
      res.status(200).json(requests)
      return
    }
    res.status(200).json([])
  } catch (error) {
    console.log(error);
  }
}

export const getAllByUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body
    const requests = await JobRequest.findAll({
      where: { userId }
    })

    if (Array.isArray(requests)) {
      res.status(200).json({
        success: true,
        data: requests
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

export const getJobRequestById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const jobRequest = await JobRequest.findByPk(id, {
      include: [Job, User, UserAccount]
    })

    if (!jobRequest) {
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
    const { userId, userAccountId } = req.body
    const { jobId } = req.params

    const jobRequest = await JobRequest.create({
      jobId,
      userId,
      userAccountId
    })

    if (!jobRequest) {
      res.status(500).json({
        message: `Ocurrió un error al postularte al trabajo con id ${jobId}`
      })
      return
    }

    res.status(201).json({
      success: true,
      data: jobRequest
    })
  } catch (error) {
    console.log(error);
  }
}

export const updateJobRequest = async (req: Request, res: Response) => {
  try {
    const id = req.body
    const existJobRequest = await JobRequest.findByPk(id)
    if (!existJobRequest) {
      res.status(404).json({
        message: `No exists register with id ${id}`
      })
      return
    }

    const jobRequest = await JobRequest.update({ ...req.body },
      { where: id }
    )

    if (jobRequest) {
      res.status(200).json(jobRequest)
      return
    }
  } catch (error) {
    console.log(error);
  }
}
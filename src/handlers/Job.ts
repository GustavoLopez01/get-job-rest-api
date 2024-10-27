import { Request, Response} from 'express'

export const getAllJobs = async (req: Request, res: Response) => {
    try {
    } catch (error) {
        console.log(error);
    }
}

export const getJob = async () => {
    try {
    } catch (error) {
        console.log(error);
    }
}

export const saveJob = async (req: Request, res: Response) => {
    try {
        console.log(req.body);        
        res.json(req.body)
    } catch (error) {
        console.log(error);
    }
}

export const updateJob = async (req: Request, res: Response) => {
    try {
        console.log(req.body);        
        res.json(req.body)
    } catch (error) {
        console.log(error);
    }
}
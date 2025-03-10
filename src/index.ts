import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'
import jobRouter from './router/jobRouter'
import userRouter from './router/userRouter'
import userAccountRouter from './router/userAccountRouter'
import jobRequestRouter from './router/jobRequestRouter'
import SessionRouter from './router/SessionRouter'
import rolRouter from './router/rolRouter'
import dbConnection from './db/db'

async function connectDB() {
    try {
        await dbConnection.authenticate()
        dbConnection.sync()
        console.log('Connection success');
    } catch (error) {
        console.log(error);
    }
}

connectDB()

const server = express()
const PORT = process.env.PORT || 4000

server.use(express.json())
server.use(cors())
// server.use(express.urlencoded({ extended: true }))
server.use('/uploads', express.static('uploads'))

server.use('/api/session', SessionRouter)
server.use('/api/jobs', jobRouter)
server.use('/api/users', userRouter)
server.use('/api/usersAccount', userAccountRouter)
server.use('/api/jobRequests', jobRequestRouter)
server.use('/api/roles', rolRouter)


server.listen(PORT, () => console.log(`Server is running in port -> ${PORT}`))

import dotenv from 'dotenv'
import express from 'express'
import jobRouter from './router/jobRouter'

dotenv.config()
const server = express()
const PORT = process.env.PORT || 4000


server.use(express.json())

server.use('/api/jobs', jobRouter)


server.listen(PORT, () => {
    console.log(`Server is running in port -> ${PORT}`);    
})

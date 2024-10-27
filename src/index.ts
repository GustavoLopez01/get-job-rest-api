import express from 'express'
import dotenv from 'dotenv'
import jobRouter from './router/jobRouter'
import dbConnection from './db/db'
dotenv.config()


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

server.use('/api/jobs', jobRouter)


server.listen(PORT, () => {
    console.log(`Server is running in port -> ${PORT}`);    
})

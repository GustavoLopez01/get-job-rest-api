import dbConnection from "../db/db";
import Job from "../models/Job.model";
import UserAccount from "../models/UserAccount.model";
import { JOBS, USER_ACCOUNTS } from "./data/data";

async function seed() {
    try {
        await dbConnection.authenticate()
        await Job.bulkCreate(JOBS)
        await UserAccount.bulkCreate(USER_ACCOUNTS)
        await dbConnection.sync()
    } catch (error) {
        console.log(error);
    } finally {
        await dbConnection.close()
    }
}

seed()
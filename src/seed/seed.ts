import dbConnection from "../db/db";
import Job from "../models/Job.model";
import Role from "../models/Role.model";
import User from "../models/User.model";
import UserAccount from "../models/UserAccount.model";
import { 
    JOBS, 
    ROLES, 
    USER_ACCOUNTS, 
    USERS
} from "./data/data";

async function seed() {
    try {
        await dbConnection.authenticate()
        await Job.bulkCreate(JOBS)
        await Role.bulkCreate(ROLES)
        await User.bulkCreate(USERS)
        await UserAccount.bulkCreate(USER_ACCOUNTS)
        await dbConnection.sync()
    } catch (error) {
        console.log(error);
    } finally {
        await dbConnection.close()
    }
}

seed()
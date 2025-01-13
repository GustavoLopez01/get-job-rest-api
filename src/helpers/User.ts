import bcrypt from 'bcrypt' 
import Role from '../models/Role.model'
import User from '../models/User.model'
import UserAccount from '../models/UserAccount.model'

export const getUserByEmail = async ({ email }) => {
    try {
        const user = await User.findOne({ 
            where: { email },
            include: [UserAccount, Role]
        })
        
        if(user) {
            return user
        }
        return null
    } catch (error) {
        console.log(error);
        return null
    }
}

export const encryptString = (textPlain: string) => {
    try {
        const salt = bcrypt.genSaltSync(Number(process.env.SALT_ROUNDS))
        return bcrypt.hashSync(textPlain, salt)
    } catch (error) {
        console.log(error);
    }
}

export const validateEncryptString = (textPlain: string, hash: string) => {
    try {
        return bcrypt.compareSync(textPlain, hash)
    } catch (error) {
        console.log(error);
    }
}
import User from "../models/User.model"
import UserAccount from "../models/UserAccount.model"

export const getUserByEmail = async ({ email }) => {
    try {
        const user = await User.findOne({ 
            where: { email },
            include: [UserAccount]
        })
        
        if(user.id) {
            return user
        }
        return null
    } catch (error) {
        console.log(error);
    }
}
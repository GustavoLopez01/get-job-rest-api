import User from "../models/User.model"

export const getUserByEmail = async ({ email }) => {
    try {
        const user = await User.findOne({ where: { email } })
        if(user.id) {
            return user
        }
        return null
    } catch (error) {
        console.log(error);
    }
}
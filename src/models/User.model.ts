import {
    Table,
    Column,
    DataType,
    Model,
    HasOne,
} from 'sequelize-typescript'
import UserAccount from './User_Account.model'

@Table({ tableName: 'Users' })
class User extends Model {

    @Column({
        type: DataType.STRING(50)
    })
    declare username: string

    @Column({
        type: DataType.STRING(50)
    })
    declare email: string

    @Column({
        type: DataType.STRING(50)
    })
    declare password: string
    
    @HasOne(() => UserAccount)
    declare userAccount: UserAccount 
}

export default User
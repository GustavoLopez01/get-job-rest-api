import {
    Table,
    Column,
    DataType,
    Model,
    HasOne,
    HasMany,
} from 'sequelize-typescript'
import UserAccount from './UserAccount.model'
import JobRequest from './JobRequest.model'

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

    @HasMany(() => JobRequest)
    declare jobRequests: JobRequest[]
}

export default User
import {
    Table,
    Column,
    DataType,
    Model,
    ForeignKey,
    BelongsTo
} from 'sequelize-typescript'
import User from './User.model'
import Job from './Job.model'
import UserAccount from './UserAccount.model'

@Table({ tableName: 'Job_Request' })

class JobRequest extends Model {

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER
    })
    declare userId: number

    @BelongsTo(() => User)
    declare user: User

    @ForeignKey(() => UserAccount)
    @Column({
        type: DataType.INTEGER
    })
    declare userAccountId: number

    @BelongsTo(() => UserAccount)
    declare userAccount: UserAccount

    @ForeignKey(() => Job)
    @Column({
        type: DataType.INTEGER
    })
    declare jobId: number

    @BelongsTo(() => Job)
    declare job: Job

}

export default JobRequest
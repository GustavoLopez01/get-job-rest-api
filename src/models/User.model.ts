import {
    Table,
    Column,
    DataType,
    Model,
    HasOne,
    HasMany,
    Unique,
    ForeignKey,
    BelongsTo
} from 'sequelize-typescript'
import UserAccount from './UserAccount.model'
import JobRequest from './JobRequest.model'
import Role from './Role.model'

@Table({ tableName: 'Users' })
class User extends Model {

    @Column({
        type: DataType.STRING(50)
    })
    declare name: string

    @Column({
        type: DataType.STRING(50)
    })
    declare lastName: string

    @Unique
    @Column({
        type: DataType.STRING(50)
    })
    declare email: string

    @Column({
        type: DataType.STRING(100)
    })
    declare password: string

    @ForeignKey(() => Role)
    @Column({
        type: DataType.INTEGER
    })
    declare roleId: number

    @BelongsTo(() => Role)
    declare role: Role
    
    @HasOne(() => UserAccount)
    declare userAccount: UserAccount

    @HasMany(() => JobRequest)
    declare jobRequests: JobRequest[]
}

export default User
import {
    Table,
    Column,
    Default,
    Model,
<<<<<<< Updated upstream
    DataType
} from 'sequelize-typescript'
=======
    DataType,
    HasMany,
    ForeignKey
} from 'sequelize-typescript'
import JobRequest from './JobRequest.model'
import User from './User.model'
>>>>>>> Stashed changes


@Table({ tableName: 'Jobs' })
class Job extends Model {

    @Column({
        type: DataType.STRING(100)
    })
    declare name: string

    @Column({
        type: DataType.STRING(150)
    })
    declare description: string

    @Default(true)
    @Column({
        type: DataType.BOOLEAN
    })
    declare active: boolean

<<<<<<< Updated upstream
=======
    @Column({
        type: DataType.INTEGER
    })
    declare salary: number

    @Default(true)
    @Column({
        type: DataType.BOOLEAN
    })
    declare showSalary: boolean

    @Column({
        type: DataType.STRING
    })
    declare details: string

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER
    })
    declare userId: number

    @HasMany(() => JobRequest)
    declare jobRequests: JobRequest[]

>>>>>>> Stashed changes
}

export default Job
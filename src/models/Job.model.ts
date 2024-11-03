import {
    Table,
    Column,
    Default,
    Model,
    DataType,
    HasMany
} from 'sequelize-typescript'
import JobRequest from './JobRequest.model'


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

    @HasMany(() => JobRequest)
    declare jobRequests: JobRequest[]

}

export default Job
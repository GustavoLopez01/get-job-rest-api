import { 
    Column, 
    DataType, 
    Table,
    Model,
    HasMany,
} from 'sequelize-typescript'
import User from './User.model'

@Table({ tableName: 'Roles' })

class Role extends Model {

    @Column({
        type: DataType.STRING
    })
    declare name: string

    @Column({
        type: DataType.STRING
    })
    declare description: string

    @HasMany(() => User)
    declare users: User[]

}

export default Role
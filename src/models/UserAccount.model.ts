import {
    Table,
    Column,
    DataType,
    ForeignKey,
    Model,
} from 'sequelize-typescript'
import User from './User.model'

@Table({ tableName: 'User_Accounts' })
class UserAccount extends Model {

    @Column({
        type: DataType.CHAR(1)
    })
    declare gender: string

    @Column({
        type: DataType.INTEGER
    })
    declare age: number
    
    @Column({
        type: DataType.BOOLEAN
    })
    declare isVerified: boolean

    @Column({
        type: DataType.BOOLEAN
    })
    declare isLogged: boolean

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER
    })
    declare userId: number
}

export default UserAccount
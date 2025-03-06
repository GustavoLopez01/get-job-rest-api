import {
    Table,
    Column,
    DataType,
    ForeignKey,
    Model,
    Default
} from 'sequelize-typescript'
import User from './User.model'

@Table({ tableName: 'User_Accounts' })
class UserAccount extends Model {

    @Default('')
    @Column({
        type: DataType.CHAR(1)
    })
    declare gender: string

    @Default(0)
    @Column({
        type: DataType.INTEGER
    })
    declare age: number

    @Default('')
    @Column({
        type: DataType.STRING
    })
    declare verifyToken: string

    @Default('')
    @Column({
        type: DataType.STRING
    })
    declare cv: string
    
    @Default(false)
    @Column({
        type: DataType.BOOLEAN
    })
    declare isVerified: boolean

    @Default(false)
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
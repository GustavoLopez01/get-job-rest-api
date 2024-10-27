import { Sequelize } from 'sequelize-typescript'

const dbConnection = new Sequelize({
    dialect: 'mysql',
    host: 'localhost',
    database: 'getJob',
    username: 'root',
    password: 'root',
    port: 3306,
    models: [__dirname + '/../models/**/*.ts'],
    logging: console.log
})

export default dbConnection
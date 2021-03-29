const { Sequelize, Op } = require('sequelize')

const dbConfig = require('./config/database.json')

const UserDB = require('#database/model/user')
const AccountDB = require('#database/model/account')
const AccountPlanDB = require('#database/model/account-plan')
const TransactionDB = require('#database/model/transaction')

const conn = new Sequelize(dbConfig.development)

const modelsDB = [UserDB, AccountDB, AccountPlanDB, TransactionDB]

modelsDB.forEach(modelDB => modelDB.init(conn))

modelsDB.forEach(modelDB => {
    if(Reflect.has(modelDB, 'associate'))
        modelDB.associate(conn.models)
})

module.exports = {
    UserDB,
    AccountDB,
    AccountPlanDB,
    TransactionDB,
    conn,
    Op
}



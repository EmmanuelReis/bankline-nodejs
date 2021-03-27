const { Op } = require('sequelize')

const { connectPostgres } = require('#database/conn')

const conn = connectPostgres()

const UserDB = require('#database/model/user')
const AccountDB = require('#database/model/account')
const AccountPlanDB = require('#database/model/account-plan')

const modelsDB = [UserDB, AccountDB, AccountPlanDB]

modelsDB.forEach(modelDB => modelDB.init(conn))

modelsDB.forEach(modelDB => {
    if(Reflect.has(modelDB, 'associate'))
        modelDB.associate(conn.models)
})

module.exports = {
    UserDB,
    AccountDB,
    AccountPlanDB,
    conn,
    Op
}



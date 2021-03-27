require('dotenv').config()

const CryptoJS = require('crypto-js')

const Account = require('#model/account')
const BaseRepository = require('#repository/_base-repository')
const { UserDB, AccountDB, conn, Op } = require('#database/postgres')

class UserRepository extends BaseRepository {
    constructor() {
        super(UserDB)
    }

    async create(model) {
        const transaction = await conn.transaction()

        try {
            const user = await UserDB.create(model, { transaction })

            await AccountDB.create(new Account({ user_id: user.id }), { transaction })

            await transaction.commit()

            return user.get()
        }
        catch(error) {
            await transaction.rollback()
            
            throw new Error("Ops!")
        }
    }

    async findByCpfOrLogin(cpf, login) {
        return await UserDB.findOne({ where: { [Op.or]: { cpf, login } }})
    }

    async findUser(login, password) {
        const users = await UserDB.findAll({ where: { [Op.or]: { login, cpf: login }, active: true } })
        
        return users.map(user => user.get()).some(user => user.password == password) 
    }
}

module.exports = UserRepository
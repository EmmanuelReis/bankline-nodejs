const Account = require('#model/account')
const BaseRepository = require('#repository/_base-repository')
const { UserDB, AccountDB, conn, Op } = require('#database/postgres')

class UserRepository extends BaseRepository {
    constructor() {
        super(UserDB)
    }

    async create(model) {
        const createUserAndAccount = await conn.transaction()

        try {
            const user = await super.create(model, { transaction: createUserAndAccount })

            await AccountDB.create(new Account({ user_id: user.id }), { transaction: createUserAndAccount })

            await createUserAndAccount.commit()

            return user.get()
        }
        catch(error) {
            await createUserAndAccount.rollback()
            
            throw new Error("Ops!")
        }
    }

    async findByCpfOrLogin(cpf, login) {
        return await UserDB.findOne({ where: { [Op.or]: { cpf, login } }})
    }
}

module.exports = UserRepository
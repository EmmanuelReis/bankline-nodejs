const User = require('#model/user')
const UserRepository = require('#repository/user')
const BaseService = require('#service/_base-service')
const { toDTO } = require('#dto/user')

class UserService extends BaseService {
    constructor() {
        super(User, toDTO, UserRepository)
    }

    async create(payload) {
        const exist = await this._repository.findByCpfOrLogin(payload.cpf, payload.login)

        if(exist)
            throw Error('Ops!')

        return await super.create(payload)
    }

    async login(payload) {
        const { login, password } = payload

        if(!login || !password)
            throw Error('Ops!')

        const exist = await this._repository.findUser(login, password)

        if(!exist)
            throw Error('Ops!')

        return { ok: 'ok' } 
    }
}

module.exports = UserService
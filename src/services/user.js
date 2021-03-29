const Boom = require('@hapi/boom')

const User = require('#model/user')
const UserRepository = require('#repository/user')
const BaseService = require('#service/_base-service')
const { toDTO } = require('#dto/user')
const AccountDTO = require('#dto/account')

class UserService extends BaseService {
    constructor() {
        super(User, toDTO, UserRepository)
    }

    async create(payload) {
        const exist = await this._repository.findByCpfOrLogin(payload.cpf, payload.login)

        if(exist)
            throw Boom.conflict('Login or cpf already exists')

        return await super.create(payload)
    }

    async login(payload) {
        const { login, password } = payload

        const exist = await this._repository.findUser(login, password)

        if(!exist)
            throw Boom.notAcceptable('Invalid login or password')

        return exist 
    }

    async account(id) {
        return AccountDTO.toDTO(await this._repository.findAccount(id) ?? {}) 
    }
}

module.exports = UserService
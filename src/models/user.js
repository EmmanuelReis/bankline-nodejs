const BaseModel = require('#model/_base-model')
const Account = require('#model/account')

class User extends BaseModel {
    #MAX_LENGTH = {
        name: 50,
        login: 20,
        password: 20,
        cpf: 11
    }

    constructor({ id, name, login, cpf, password, created_at, updated_at, active }) {
        super(id, created_at, updated_at, active)
        
        this.name = name
        this.login = login
        this.cpf = cpf?.replace(/\D/, '')
        this.password = password
    }

    #getMaxLength(property) {
        return this.#MAX_LENGTH[property]        
    }

    isValid() {
        return !(['name', 'login'].some(key => !this[key] || this[key].length > this.#getMaxLength(key.toLowerCase()))
                || this.cpf?.length != this.#MAX_LENGTH.cpf)
    }
}

module.exports = User
const faker = require('faker')

const User = require('#model/user')

class UserBuider {
    name = faker.name.firstName()
    login = faker.internet.userName()
    cpf = Array.from({ length: 11 }).reduce((prev, _) => prev + parseInt((Math.random() * 10)), '')
    password = faker.internet.password()

    static aUser = () => new this();

    withInvalidName() {
        this.name = ''
        
        return this
    }

    withInvalidLogin() {
        this.login = 'invalidLoginInvalidLogin'
        
        return this
    }

    withInvalidCpf() {
        this.cpf = '123455612'
        
        return this
    }

    withInvalidPassword() {
        this.password = 'inv'
        
        return this
    }

    build() {
        return new User(this)
    }
}

module.exports = UserBuider
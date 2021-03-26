const { describe, it } = require('mocha')
const { expect } = require('chai')

const { aUser } = require('#test/builder/user')

describe('User tests', () => {
    it('Should be return "false" when trying to create a user with an invalid name', () => {
        const user = aUser().withInvalidName().build()

        expect(user.isValid()).to.be.false
    })

    it('Should be return "false" when trying to create a user with an invalid login', () => {
        const user = aUser().withInvalidLogin().build()

        expect(user.isValid()).to.be.false
    })

    it('Should be return "false" when trying to create a user with an invalid cpf', () => {
        const user = aUser().withInvalidCpf().build()

        expect(user.isValid()).to.be.false
    })

    it('Should be return "true" when trying to create a valid user', () => {
        const user = aUser().build()

        expect(user.isValid()).to.be.true
    })
})
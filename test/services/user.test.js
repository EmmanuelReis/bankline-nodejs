const { describe, it, before, beforeEach } = require('mocha')
const chai = require('chai')
const { createSandbox } = require('sinon')
const faker = require('faker')

chai.use(require('chai-as-promised'))

const expect = chai.expect 

const User = require('#model/user')
const UserService = require('#service/user')
const UserRepository = require('#repository/user')

describe('User tests', () => {
    var sandbox
    var service
    var payload

    before(() => {
        payload = {
            name: faker.name.firstName(),
            login: faker.internet.userName(),
            cpf: Array.from({ length: 11 }).reduce((prev, _) => prev + parseInt((Math.random() * 10)), ''),
            password: faker.internet.password()
        }
        
        sandbox = createSandbox()
    })

    beforeEach(() => {
        service = new UserService()
        sandbox.restore()
    })

    it('Should be thrown an error "" when trying to create a user with an existing login', async () => {
        sandbox.stub(UserRepository.prototype, 'findByCpfOrLogin').resolves(true)
        
        await expect(service.create(payload)).to.be.rejectedWith(Error)
    })

    it('Should be thrown an error "" when trying to create a user with an existing cpf', async () => {
        sandbox.stub(UserRepository.prototype, 'findByCpfOrLogin').resolves(true)
        
        await expect(service.create(payload)).to.be.rejectedWith(Error)
    })

    it('Should be thrown an error "" when trying to update a user non-existent', async () => {
        sandbox.stub(UserRepository.prototype, 'getToUpdate').resolves(false)
        
        await expect(service.update(payload)).to.be.rejectedWith(Error)
    })

    it('Should be thrown an error "" when trying to delete a user non-existent', async () => {
        sandbox.stub(UserRepository.prototype, 'getToUpdate').resolves(false)
        
        await expect(service.delete(payload)).to.be.rejectedWith(Error)
    })

    it('Should be returned a JSON with the fields "id, name, login, cpf" when trying to create a valid user', async () => {
        const user = new User(payload)

        sandbox.stub(UserRepository.prototype, 'findByCpfOrLogin').resolves(false)
        sandbox.stub(UserRepository.prototype, 'create').resolves(user)
        
        const expected = ['id', 'name', 'login', 'cpf']
        const result = await service.create(payload)

        expect(Reflect.ownKeys(result)).to.deep.equals(expected)
    })
})
require('dotenv').config()

const Jwt = require('jsonwebtoken')

const UserService = require('#service/user')

const service = new UserService()

const generateToken = (user) => {
    const token = Jwt.sign({
        sub: user.id,
        name: user.name,
        cpf: user.cpf
    }, process.env.SECRET_KEY, { 
        algorithm: 'HS256',
        expiresIn: 30 * 60
    })

    return token
}

const authenticate = async (req, h) => {
    const user = await service.login(req.payload)

    const token = generateToken(user)

    return h
        .response({ token })
        .location(`http://${process.env.APPLICATION_HOST}:${process.env.APPLICATION_PORT}/users/${user.id}/account`)
        .header("Authorization", token)
        .code(200)
}

const validate = async (decode, req, h) => {
    const { sub, name, cpf } = decode
    const user = await service.find(sub)

    return {
        isValid: user && user.name == name && user.cpf == cpf 
    }
}
    
module.exports = {
    authenticate,
    generateToken,
    validate
}
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
        algorithm: 'HS256'
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
    
module.exports = {
    authenticate,
    generateToken
}
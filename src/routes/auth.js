const Joi = require('joi')

const { authenticate } = require('#auth')

module.exports = {
    method: 'POST',
    path: '/login',
    config: { 
        auth: false,
        description: 'Authentication',
        notes: 'Returns an authentication token',
        tags: ['api'],
        validate: {
            payload: Joi.object({
                login: Joi.string().min(5).max(20).required(),
                password: Joi.string().min(5).max(20).required()
            })
        }
    },
    handler: authenticate
}
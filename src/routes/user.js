const Joi = require('joi')

const UserHandler = require('#handler/user')
const handler = new UserHandler()
const path = '/users'

module.exports = [
    {
        method: 'GET',
        path,
        config: {
            description: 'Get all users',
            notes: 'Lists of users',
            tags: ['api'],
            validate: {
                headers: Joi.object({
                    authorization: Joi.string().required()
                }).unknown()
            },
            response: {
                schema: Joi.array().items(Joi.object({
                    id: Joi.string().guid(),
                    created_at: Joi.date().iso(),
                    updated_at: Joi.date().iso(),
                    name: Joi.string(),
                    login: Joi.string(),
                    cpf: Joi.string()
                })).label('Result')
            }
        },
        handler: handler.list.bind(handler)
    },
    {
        method: 'POST',
        path,
        config: {
            description: 'Create user',
            tags: ['api'],
            validate: {
                headers: Joi.object({
                    authorization: Joi.string().required()
                }).unknown(),
                payload: Joi.object({
                    name: Joi.string().max(50).required(),
                    login: Joi.string().max(20).required(),
                    cpf: Joi.string().min(11).max(11).required(),
                    password: Joi.string().max(20).required()
                })
            }
        },
        handler: handler.create.bind(handler)
    },
    {
        method: 'GET',
        path: `${path}/{id}`,
        config: {
            auth: false,
            description: 'Get an user by id',
            notes: 'Return an user if it exists',
            tags: ['api'],
            validate: {
                headers: Joi.object({
                    authorization: Joi.string().required()
                }).unknown(),
                params: Joi.object({
                    id: Joi.string().guid().required()
                })
            },
            response: {
                schema: Joi.object({
                    id: Joi.string().guid(),
                    created_at: Joi.date().iso(),
                    updated_at: Joi.date().iso(),
                    name: Joi.string(),
                    login: Joi.string(),
                    cpf: Joi.string()
                }).label('Result')
            }
        },
        handler: handler.find.bind(handler)
    },
    {
        method: 'GET',
        path: `${path}/{id}/account`,
        config: {
            auth: false,
            description: 'Get user\'s account',
            tags: ['api'],
            validate: {
                headers: Joi.object({
                    authorization: Joi.string().required()
                }).unknown(),
                params: Joi.object({
                    id: Joi.string().guid().required()
                })
            },
            response: {
                schema: Joi.object({
                    id: Joi.string().guid(),
                    balance: Joi.number()
                }).label('Result')
            }
        },
        handler: handler.getAccount.bind(handler)
    },
    {
        method: 'PATCH',
        path: `${path}/{id}`,
        config: {
            description: 'Update user',
            notes: 'Update a user\'s values',
            tags: ['api'],
            validate: {
                headers: Joi.object({
                    authorization: Joi.string().required()
                }).unknown(),
                payload: Joi.object({
                    name: Joi.string().max(50).optional(),
                    login: Joi.string().max(20).optional(),
                    password: Joi.string().max(20).optional()
                })
            },
            response: {
                schema: Joi.object({
                    name: Joi.string().max(50).optional(),
                    login: Joi.string().max(20).optional(),
                    password: Joi.string().max(20).optional()
                }).label('Result')
            }
        },
        handler: handler.update.bind(handler)
    },
    {
        method: 'DELETE',
        path: `${path}/{id}`,
        config: {
            description: 'Delete a user',
            tags: ['api'],
            validate: {
                headers: Joi.object({
                    authorization: Joi.string().required()
                }).unknown()
            }
        },
        handler: handler.delete.bind(handler)
    }
]
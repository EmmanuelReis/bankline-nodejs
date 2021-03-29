const Joi = require('joi')

const UserHandler = require('#handler/user')
const AccountPlanHandler = require('#handler/account-plan')
const UserSchema = require('#database/schema/user')
const AccountSchema = require('#database/schema/account')
const AccountPlanSchema = require('#database/schema/account-plan')

const handler = new UserHandler()
const accountPlanHandler = new AccountPlanHandler()

const path = `/${UserSchema.table_name}`

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
            auth: false,
            description: 'Create user',
            tags: ['api'],
            validate: {
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
        path: `${path}/{id}/${AccountSchema.table_name}`,
        config: {
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
                    password: Joi.string().max(20).optional(),
                    active: Joi.bool().optional()
                })
            },
            response: {
                schema: Joi.object({
                    name: Joi.string().max(50).optional(),
                    login: Joi.string().max(20).optional(),
                    password: Joi.string().max(20).optional(),
                    active: Joi.bool().optional()
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
    },
    {
        method: 'GET',
        path: `${path}/{id}/${AccountPlanSchema.table_name}`,
        config: {
            description: 'User account plans',
            tags: ['api'],
            validate: {
                headers: Joi.object({
                    authorization: Joi.string().required()
                }).unknown(),
                params: Joi.object({
                    id: Joi.string().guid().required()
                })
            }
        },
        handler: accountPlanHandler.find.bind(accountPlanHandler)
    },
    {
        method: 'POST',
        path: `${path}/{id}/${AccountPlanSchema.table_name}`,
        config: {
            description: 'Create account plan',
            tags: ['api'],
            validate: {
                headers: Joi.object({
                    authorization: Joi.string().required()
                }).unknown(),
                params: Joi.object({
                    id: Joi.string().guid().required()
                }),
                payload: Joi.object({
                    name: Joi.string().max(20).required(),
                    type_id: Joi.string().guid().required()
                })
            }
        },
        handler: accountPlanHandler.create.bind(accountPlanHandler)
    }
]
const Joi = require('joi')

const TransactionHandler = require('#handler/transaction')
const handler = new TransactionHandler()
const path = '/transactions'

module.exports = [
    {
        method: 'GET',
        path,
        config: {
            description: 'List transactions',
            notes: 'Returns a list of all transactions',
            tags: ['api'],
            validate: {
                headers: Joi.object({
                    authorization: Joi.string().required()
                }).unknown()
            },
            response: {
                schema: Joi.array().items(Joi.object({
                    created_at: Joi.date().iso(),
                    value: Joi.number(),
                    id: Joi.string()
                })).label('Result')
            }
        },
        handler: handler.list.bind(handler)
    },
    {
        method: 'GET',
        path: `${path}/{id}`,
        config: {
            description: 'Account transactions',
            notes: 'Lists an account\'s transactions',
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
                schema: Joi.array().items(Joi.object({
                    created_at: Joi.date().iso(),
                    value: Joi.number(),
                    plan: Joi.string(),
                    source_user: Joi.string(),
                    target_user: Joi.string().allow(''),
                    id: Joi.string()
                })).label('Result')
            }
        },
        handler: handler.find.bind(handler)
    },
    {
        method: 'POST',
        path,
        config: {
            description: 'Create transaction',
            tags: ['api'],
            validate: {
                headers: Joi.object({
                    authorization: Joi.string().required()
                }).unknown(),
                payload: Joi.object({
                    value: Joi.number().min(1).required(),
                    type_id: Joi.string().guid().required().description('Account plan id'),
                    source_account_id: Joi.string().guid().required(),
                    target_account_id: Joi.string().guid().allow('').optional()
                })
            }
        },
        handler: handler.create.bind(handler)
    }
]
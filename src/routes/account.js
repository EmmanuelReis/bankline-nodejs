const Joi = require('joi')

const AccountHandler = require('#handler/account')
const AccountSchema = require('#database/schema/account')
const TransactionHandler = require('#handler/transaction')

const handler = new AccountHandler()
const transactionHandler = new TransactionHandler()

const path = `/${AccountSchema.table_name}`

module.exports = [
    {
        method: 'GET',
        path,
        config: {
            description: 'List all accounts',
            tags: ['api'],
            validate: {
                headers: Joi.object({
                    authorization: Joi.string().required()
                }).unknown()
            },
            response: {
                schema: Joi.array().items(Joi.object({
                    id: Joi.string().guid()
                })).label('Result')
            }
        },
        handler: handler.list.bind(handler)
    },
    {
        method: 'GET',
        path: `${path}/{id}`,
        config: {
            description: 'Account by id',
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
                    id: Joi.string(),
                    balance: Joi.number()
                }).label('Result')
            }
        },
        handler: handler.find.bind(handler)
    },
    {
        method: 'GET',
        path: `${path}/{id}/transactions`,
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
        handler: transactionHandler.find.bind(transactionHandler)
    },
    {
        method: 'POST',
        path: `${path}/{id}/transactions`,
        config: {
            description: 'Create transaction',
            tags: ['api'],
            validate: {
                headers: Joi.object({
                    authorization: Joi.string().required()
                }).unknown(),
                params: Joi.object({
                    id: Joi.string().guid().required()
                }),
                payload: Joi.object({
                    value: Joi.number().min(1).required(),
                    type_id: Joi.string().guid().required().description('Account plan id'),
                    target_account_id: Joi.string().guid().allow('').optional()
                })
            }
        },
        handler: transactionHandler.create.bind(transactionHandler)
    }
]
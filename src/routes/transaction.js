const Joi = require('joi')

const TransactionHandler = require('#handler/transaction')
const handler = new TransactionHandler()
const path = '/transactions'

module.exports = {
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
}
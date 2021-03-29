const Joi = require('joi')

const AccountPlanHandler = require('#handler/account-plan')
const AccountPlanSchema = require('#database/schema/account-plan')

const accountPlanHandler = new AccountPlanHandler()

const path = `/${AccountPlanSchema.table_name}`

module.exports =[
    {
        method: 'PATCH',
        path: `${path}/{id}`,
        config: {
            description: 'Update account plan',
            tags: ['api'],
            validate: {
                headers: Joi.object({
                    authorization: Joi.string().required()
                }).unknown(),
                params: Joi.object({
                    id: Joi.string().guid().required()
                }),
                payload: Joi.object({
                    name: Joi.string().max(20).optional(),
                    active: Joi.bool().optional()
                })
            }
        },
        handler: accountPlanHandler.update.bind(accountPlanHandler)
    },
    {
        method: 'DELETE',
        path: `${path}/{id}`,
        config: {
            description: 'Delete account plan',
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
        handler: accountPlanHandler.delete.bind(accountPlanHandler)
    }
]
const AccountPlan = require('#model/account-plan')
const AccountPlanRepository = require('#repository/account-plan')
const BaseService = require('#service/_base-service')
const { toDTO } = require('#dto/account-plan')

class AccountPlanService extends BaseService {
    constructor() {
        super(AccountPlan, toDTO, AccountPlanRepository)
    }

    async create(payload) {
        const type = await this._repository.find(payload.type_id)

        if(!type)
            throw Boom.notFound('Account plan not found')
        
        payload.type = type
        payload.type_code = type.type_code

        return await super.create(payload)
    }

    async find(user_id, options) {
        const accounts_plans = await this._repository.findByUser(user_id, options)
        
        return accounts_plans.map(plan => this._toDTO(plan.get()))
    }
}

module.exports = AccountPlanService
const Boom = require('@hapi/boom')

const Transaction = require('#model/transaction')
const TransactionType = require('#model/transaction-type')
const TransactionRepository = require('#repository/transaction')
const AccountPlanRepository = require('#repository/account-plan')
const BaseService = require('#service/_base-service')
const { toDTO } = require('#dto/transaction')

class TransactionService extends BaseService {
    constructor() {
        super(Transaction, toDTO, TransactionRepository)
    }

    async create(payload) {
        const account_plan = await new AccountPlanRepository().find(payload.type_id, {})
        
        if(!account_plan)
            throw Boom.notFound('Account plan not found')

        payload.type = Reflect.ownKeys(TransactionType).find(key => TransactionType[key].code == account_plan.type_code)
        
        return await super.create(payload)
    }

    async find(id, options = {}) {
        const list = await this._repository.find(id, options)

        return list.map(this._toDTO)
    }
}

module.exports = TransactionService
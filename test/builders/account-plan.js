const faker = require('faker')

const AccountPlan = require('#model/account-plan')
const TransactionTypes = require('#model/transaction-type')

class AccountPlanBuilder {
    name = faker.finance.currencyName()
    type = { name: 'RECEITA' }
    user_id = faker.datatype.uuid()
    type_code = TransactionTypes['RECEITA'].code

    static aPlan = () => new this();

    withInvalidName() {
        this.name = ''
        
        return this
    }

    withInvalidType() {
        this.type = 'invalid'
        
        return this
    }

    withoutUserId() {
        this.user_id = null
        
        return this
    }

    build() {
        return new AccountPlan(this)
    }
}

module.exports = AccountPlanBuilder
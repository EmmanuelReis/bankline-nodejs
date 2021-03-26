const faker = require('faker')

const AccountPlan = require('#model/account-plan')
const { aUser } = require('#test/builder/user')

class AccountPlanBuilder {
    name = faker.finance.currencyName()
    type = 'RECEITA'
    user = aUser().build()

    static aPlan = () => new this();

    withInvalidName() {
        this.name = ''
        
        return this
    }

    withInvalidType() {
        this.type = 'invalid'
        
        return this
    }

    withoutUser() {
        this.user = null
        
        return this
    }

    build() {
        return new AccountPlan(this)
    }
}

module.exports = AccountPlanBuilder
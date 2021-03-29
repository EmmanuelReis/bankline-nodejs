const BaseModel = require('#model/_base-model')
const Type = require('#model/transaction-type')

class AccountPlan extends BaseModel {
    constructor({ id, name, type, user, created_at, updated_at, active }) {
        super(id, created_at, updated_at, active)

        this.name = name
        this.type = type
        this.user = user
    }

    isValid() {
        return !(!this.name || this.name.length > 50
                || !Type[this.type?.toUpperCase()]
                || !this.user?.id)
    }
}

module.exports = AccountPlan
const BaseModel = require('#model/_base-model')
const Type = require('#model/transaction-type')

class AccountPlan extends BaseModel {
    constructor({ id, name, type, type_code, user_id, created_at, updated_at, active }) {
        super(id, created_at, updated_at, active)

        this.name = name
        this.type = type
        this.type_code = type_code
        this.user_id = user_id
    }

    isValid() {
        return !(!this.name || this.name.length > 50
                || !Type[this.type.name?.toUpperCase()]
                || !this.user_id)
    }
}

module.exports = AccountPlan
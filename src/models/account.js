const BaseModel = require('#model/_base-model');

class Account extends BaseModel {
    constructor({ id, balance, created_at, active, updated_at, user_id }) {
        super(id, created_at, updated_at, active)

        this.user_id = user_id
        this.balance = balance || 0
    }
}

module.exports = Account
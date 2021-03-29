const BaseModel = require('#model/_base-model')
const Type = require('#model/transaction-type')

class Transaction extends BaseModel {
    constructor({ id, value, type, source_account, target_account, created_at, updated_at, active }) {
        super(id, created_at, updated_at, active)

        this.value = value
        this.type = type
        this.source_account = source_account
        this.target_account = target_account
    }

    isValid() {
        const transaction_type = this.type?.toUpperCase()

        return !(this.value <= 0
                || !Type[transaction_type]
                || !this.source_account
                || Type[transaction_type].code == "T" && !this.target_account)
    }
}

module.exports = Transaction
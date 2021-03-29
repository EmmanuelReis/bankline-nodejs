const Type = require('#model/transaction-type')

class Transaction {
    constructor({ id, value, type, source_account_id, target_account_id, created_at }) {
        const now = Date.now()

        this.id = id
        this.value = value
        this.type = type
        this.source_account_id = source_account_id
        this.target_account_id = target_account_id
        this.created_at = created_at || now
    }

    isValid() {
        const transaction_type = this.type?.toUpperCase()

        return !(this.value <= 0
                || !Type[transaction_type]
                || !this.source_account_id
                || Type[transaction_type].code == "T" && !this.target_account_id)
    }
}

module.exports = Transaction
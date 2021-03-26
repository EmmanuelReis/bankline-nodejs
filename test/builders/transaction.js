const faker = require('faker')

const Transaction = require('#model/transaction')
const Account = require('#model/account')

class TransactionBuilder {
    value = faker.finance.amount()
    type = "RECEITA"
    source_account = new Account({ user_id: '561512de-c8f7-45f7-ba1b-cf032f53ce79' })
    target_account = null

    static aTransaction = () => new this();

    withInvalidValue() {
        this.value = 0
        
        return this
    }

    withInvalidType() {
        this.type = 'invalid'
        
        return this
    }

    withoutSourceAccount() {
        this.source_account = null
        
        return this
    }

    invalidTransfer() {
        this.type = "TRANSFERENCIA"
        this.target_account = null

        return this
    }

    expense() {
        this.type = "DESPESA"

        return this
    }

    validTransfer() {
        this.type = "TRANSFERENCIA"
        this.target_account = new Account({ user_id: 'f4c0d834-44ad-4b43-ab32-e190205e387d' })
        
        return this
    }

    build() {
        return new Transaction(this)
    }
}

module.exports = TransactionBuilder
const faker = require('faker')

const Transaction = require('#model/transaction')
const Account = require('#model/account')

class TransactionBuilder {
    value = faker.finance.amount()
    type = "RECEITA"
    source_account_id = faker.datatype.uuid()
    target_account_id = null

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
        this.source_account_id = ""
        
        return this
    }

    invalidTransfer() {
        this.type = "TRANSFERENCIA"
        this.target_account = ""

        return this
    }

    expense() {
        this.type = "DESPESA"

        return this
    }

    validTransfer() {
        this.type = "TRANSFERENCIA"
        this.target_account_id = faker.datatype.uuid()
        
        return this
    }

    build() {
        return new Transaction(this)
    }
}

module.exports = TransactionBuilder
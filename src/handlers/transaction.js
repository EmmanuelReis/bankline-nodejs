const BaseHandler = require('#handler/_base-handler')
const TransactionService = require('#service/transaction')

class TransactionHandler extends BaseHandler {
    constructor() {
        super('transactions', TransactionService)
    }
}

module.exports = TransactionHandler
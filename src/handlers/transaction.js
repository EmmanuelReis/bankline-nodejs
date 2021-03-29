const BaseHandler = require('#handler/_base-handler')
const TransactionService = require('#service/transaction')

class TransactionHandler extends BaseHandler {
    constructor() {
        super({}, TransactionService)
    }

    async create(req, h) {
        req.payload.source_account_id = req.params.id

        return await super.create(req, h)
    }
}

module.exports = TransactionHandler
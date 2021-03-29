const BaseHandler = require('#handler/_base-handler')
const AccountService = require('#service/account')
const AccountSchema = require('#database/schema/account')

class AccountHandler extends BaseHandler {
    constructor() {
        super({
            find: (id) => [AccountSchema.table_name, id, 'transactions']
        }, AccountService)
    }
}

module.exports = AccountHandler
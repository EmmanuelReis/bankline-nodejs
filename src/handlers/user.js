const BaseHandler = require('#handler/_base-handler') 
const UserService = require('#service/user')
const UserSchema = require('#database/schema/user')
const AccountSchema = require('#database/schema/account')

class UserHandler extends BaseHandler {
    constructor() {
        super({
            create: (_) => ['login'],
            find: (id) => [UserSchema.table_name, id, AccountSchema.table_name],
            account_transactions: (id) => [AccountSchema.table_name, id, 'transactions']
        }, UserService)
    }

    async getAccount(req, h) {
        const account = await this._service.account(req.params.id)
        
        return h
            .response(account)
            .location(this._location('account_transactions', account.id))
            .code(200)
    }
}

module.exports = UserHandler
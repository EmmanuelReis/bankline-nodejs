const Account = require('#model/account')
const AccountRepository = require('#repository/account')
const BaseService = require('#service/_base-service')
const { toDTO } = require('#dto/account')

class AccountService extends BaseService {
    constructor() {
        super(Account, toDTO, AccountRepository)
    }

    async list() {
        return (await super.list()).map(account => { return { id: account.id }})
    }
}

module.exports = AccountService
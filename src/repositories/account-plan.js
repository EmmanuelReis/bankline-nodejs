const BaseRepository = require('#repository/_base-repository')
const { AccountPlanDB } = require('#database/postgres')

class AccountPlanRepository extends BaseRepository {
    constructor() {
        super(AccountPlanDB)
    }
}

module.exports = AccountPlanRepository
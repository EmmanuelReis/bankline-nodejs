const BaseRepository = require('#repository/_base-repository')
const { AccountPlanDB, Op } = require('#database/postgres')

class AccountPlanRepository extends BaseRepository {
    constructor() {
        super(AccountPlanDB)
    }

    async findByUser(user_id, options) {
        return await this._db_model.findAll({ where: { [Op.or]: [{ user_id }, { user_id: { [Op.eq]: null }}], active: true }});
    }
}

module.exports = AccountPlanRepository
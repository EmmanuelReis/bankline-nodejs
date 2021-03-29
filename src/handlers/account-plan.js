const BaseHandler = require('#handler/_base-handler')
const AccountPlanService = require('#service/account-plan')

class AccountPlanHandler extends BaseHandler {
    constructor() {
        super({}, AccountPlanService)
    }

    async create(req, h) {
        req.payload.user_id = req.params.id

        return await super.create(req, h)
    }
}

module.exports = AccountPlanHandler
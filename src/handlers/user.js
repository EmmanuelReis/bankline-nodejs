const BaseHandler = require('#handler/_base-handler') 
const UserService = require('#service/user')
const UserSchema = require('#database/schema/user')

class UserHandler extends BaseHandler {
    constructor() {
        super(UserSchema.table_name, UserService)
    }

    async login(req, h) {
        return h
            .response(await this._service.login(req.payload))
            .code(200)
    }
}

module.exports = UserHandler
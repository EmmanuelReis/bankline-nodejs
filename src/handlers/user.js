const BaseHandler = require('#handler/_base-handler') 
const UserService = require('#service/user')
const UserSchema = require('#database/schema/user')

class UserHandler extends BaseHandler {
    constructor() {
        super(UserSchema.table_name, UserService)
    }
}

module.exports = UserHandler
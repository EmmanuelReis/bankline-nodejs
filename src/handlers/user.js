const BaseHandler = require('#handler/_base-handler') 
const UserService = require('#service/user')
const UserSchema = require('#database/schema/user')
const { generateToken } = require('#auth')

class UserHandler extends BaseHandler {
    constructor() {
        super({
            create: (model) => [UserSchema.table_name, model.id, 'account'],
            find: (id) => this._params.create({id})
        }, UserService)
    }

    async getAccount(req, h) {
        return h
            .response(await this._service.account(req.params.id))
            .code(200)
    }
}

module.exports = UserHandler
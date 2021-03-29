require('dotenv').config()

const BaseRepository = require('#repository/_base-repository')
const { AccountDB } = require('#database/postgres')

class UserRepository extends BaseRepository {
    constructor() {
        super(AccountDB)
    }
}

module.exports = UserRepository
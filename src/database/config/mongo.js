require('dotenv').config()

module.exports = {
    username: process.env.MONGO_USER_DB,
    password: process.env.MONGO_PASSWD_DB,
    database: process.env.MONGO_DATABASE,
    host: process.env.MONGO_HOST,
    port: process.env.MONGO_PORT
}

const Auth = require('#route/auth')
const UserRoutes = require('#route/user')
const TransactionRoutes = require('#route/transaction')

module.exports = [
    Auth,
    ...UserRoutes,
    ...TransactionRoutes
]
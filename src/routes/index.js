const UserRoutes = require('#route/user')
const TransactionRoutes = require('#route/transaction')

module.exports = [
    ...UserRoutes,
    ...TransactionRoutes
]
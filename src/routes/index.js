const Auth = require('#route/auth')
const UserRoutes = require('#route/user')
const AccountRoutes = require('#route/account')
const TransactionRoutes = require('#route/transaction')
const AccountPlanRoutes = require('#route/account-plan')

module.exports = [
    Auth,
    ...UserRoutes,
    ...AccountRoutes,
    ...AccountPlanRoutes,
    TransactionRoutes
]
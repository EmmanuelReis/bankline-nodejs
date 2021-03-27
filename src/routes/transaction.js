const TransactionHandler = require('#handler/transaction')

const handler = new TransactionHandler()
const path = '/transactions'

module.exports = [
    {
        method: 'GET',
        path,
        handler: handler.list.bind(handler)
    },
    {
        method: 'GET',
        path: `${path}/{id}`,
        handler: handler.find.bind(handler)
    },
    {
        method: 'POST',
        path,
        handler: handler.create.bind(handler)
    }
]
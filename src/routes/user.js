const UserHandler = require('#handler/user')

const handler = new UserHandler()
const path = '/users'

module.exports = [
    {
        method: 'GET',
        path,
        handler: handler.list.bind(handler)
    },
    {
        method: 'POST',
        path,
        handler: handler.create.bind(handler)
    },
    {
        method: 'POST',
        path: '/login',
        handler: handler.login.bind(handler)
    },
    {
        method: 'GET',
        path: `${path}/{id}`,
        handler: handler.find.bind(handler)
    },
    {
        method: 'PATCH',
        path: `${path}/{id}`,
        handler: handler.update.bind(handler)
    },
    {
        method: 'DELETE',
        path: `${path}/{id}`,
        handler: handler.delete.bind(handler)
    }
]
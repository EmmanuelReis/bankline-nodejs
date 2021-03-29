require('dotenv').config()

class BaseHandler {
    constructor(params, service) {
        this._params = params
        this._service = new service()
    }

    async create(req, h) {
        const model = await this._service.create(req.payload)

        return h
            .response()
            .location(this._location('create', model))
            .code(201)
    }

    async find(req, h) {
        return h
            .response(await this._service.find(req.params.id, req.payload))
            .location(this._location('find', req.params.id))
            .code(200)
    }

    async update(req, h) {
        return h
            .response(await this._service.update(req.params.id, req.payload))
            .code(200)
    }

    async delete(req, h) {
        await this._service.delete(req.params.id)
        return h.response().code(200)
    }

    async list(_, h) {
        return h
            .response(await this._service.list())
            .code(200)
    }

    _location(route, value) {
        return Reflect.has(this._params, route) ? `http://${process.env.APPLICATION_HOST}:${process.env.APPLICATION_PORT}/${this._params[route](value).join('/')}` : ''
    }
}

module.exports = BaseHandler
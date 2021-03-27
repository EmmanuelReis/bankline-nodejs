require('dotenv').config()

class BaseHandler {
    constructor(name, service) {
        this._name = name
        this._service = new service()
    }

    async create(req, h) {
        const model = await this._service.create(req.payload)

        return h
            .response()
            .location(`http://${process.env.APPLICATION_HOST}:${process.env.APPLICATION_PORT}/${this._name}/${model.id}`)
            .code(201)
    }

    async find(req, h) {
        return h
            .response(await this._service.find(req.params.id, req.payload))
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
}

module.exports = BaseHandler
const Boom = require('@hapi/boom')

class BaseService {
    constructor(model, toDTO, repository) {
        this._model = model 
        this._repository = new repository()
        this._toDTO = toDTO
    }

    async create(payload) {
        const model = new this._model(payload)

        if(!model.isValid())
            throw Boom.badRequest()

        return this._toDTO(await this._repository.create(payload))
    }

    async find(id, options = {}) {
        return this._toDTO(await this._repository.find(id, options) ?? {})
    }

    async update(id, payload) {
        const exist = await this._repository.getToUpdate(id)

        if(!exist)
            throw Boom.notFound('Unable to update')
        
        return await this._repository.update(exist, payload)
    }

    async delete(id) {
        const exist = await this._repository.getToUpdate(id)

        if(!exist)
            throw Boom.notFound('Unable to delete')
        
        return await this._repository.delete(exist)
    }

    async list(options = {}) {
        const models = await this._repository.list(options)

        return models.map(this._toDTO)
    }
}

module.exports = BaseService
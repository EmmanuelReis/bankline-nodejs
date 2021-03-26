class BaseService {
    constructor(model, toDTO, repository) {
        this._model = model 
        this._repository = new repository()
        this._toDTO = toDTO
    }

    async create(payload) {
        const model = new this._model(payload)

        if(!model.isValid())
            throw new Error('Ops')

        return this._toDTO(await this._repository.create(payload))
    }

    async find(id, options = {}) {
        return this._toDTO(await this._repository.find(id, options) ?? {})
    }

    async update(id, payload) {
        const exist = await this._repository.getToUpdate(id)

        if(!exist)
            throw new Error('Ops!')
        
        return await this._repository.update(exist, payload)
    }

    async delete(id) {
        const exist = await this._repository.getToUpdate(id)

        if(!exist)
            throw new Error('Ops!')
        
        return await this._repository.delete(exist)
    }

    async list(options = {}) {
        const modelsDb = await this._repository.list(options)
        
        return modelsDb.map(this._toDTO)
    }
}

module.exports = BaseService
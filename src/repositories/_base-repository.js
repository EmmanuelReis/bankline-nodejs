class BaseRepository {
    constructor(dbModel) {
        this._dbModel = dbModel
    }

    async create(model, options = {}) {
        return await this._dbModel.create(model, options)
    }

    async find(id, options) {
        const modelDb = await this._dbModel.findByPk(id, options)

        return modelDb?.dataValues
    }

    async update(modelDb, payload) {
        const attributes = Reflect.ownKeys(payload).filter(attribute => Reflect.has(modelDb, attribute))
        
        attributes.forEach(key => modelDb[key] = payload[key])
        
        modelDb.updated_at = Date.now()

        await modelDb.save()

        return payload
    }

    async delete(modelDb) {
        return await this.update(modelDb, { active: false })
    }

    async list(options) {
        const modelsDb = await this._dbModel.findAll(Object.assign({ where: { active: true } }, options))

        return modelsDb.map(modelDb => modelDb.dataValues)
    }

    async getToUpdate(id) {
        return await this._dbModel.findByPk(id)
    }
}

module.exports = BaseRepository
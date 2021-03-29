class BaseRepository {
    constructor(db_model) {
        this._db_model = db_model
    }

    async create(model) {
        return await this._db_model.create(model)
    }

    async find(id, options) {
        const model_db = await this._db_model.findByPk(id, options)

        return model_db?.get()
    }

    async update(model_db, payload) {
        const { id, cpf, type_code, update_at, balance, ...keys } = payload

        const attributes = Reflect.ownKeys(keys).filter(attribute => Reflect.has(model_db, attribute))
        
        attributes.forEach(key => model_db[key] = keys[key])
        
        model_db.updated_at = Date.now()

        await model_db.save()

        return keys
    }

    async delete(model_db) {
        return await this.update(model_db, { active: false })
    }

    async list(options) {
        const modelsDb = await this._db_model.findAll(Object.assign({ where: { active: true } }, options))

        return modelsDb.map(model_db => model_db.get())
    }

    async getToUpdate(id) {
        return await this._db_model.findByPk(id)
    }
}

module.exports = BaseRepository
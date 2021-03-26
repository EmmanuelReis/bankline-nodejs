const { v4 } = require('uuid')

class BaseModel {
    constructor(id, created_at, updated_at, active) {
        this.id = id ?? v4()
        
        const now = Date.now()

        this.created_at = created_at || now
        this.updated_at = updated_at || now
        this.active = active ?? true
    }
}

module.exports = BaseModel
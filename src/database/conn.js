require('dotenv').config()

const Sequelize = require('sequelize')
const Mongoose = require('mongoose')

const connectPostgres = async() => {
    console.log('[DATABASE] Connecting to the Postgres...')
    
    const conn = new Sequelize(require('#database/config/postgres'))

    try {
        await conn.authenticate()
        
        console.log('[DATABASE] Connected to the Postgres!')    
        
        return conn
    } catch (error) {
        console.error('[DATABASE] Unable to connect to the Postgres:', error)
    }

    return null
}

const connectMongo = async() => {
    const { username, password, database, host, port } = require('#database/config/mongo')

    console.log('[DATABASE] Connecting to the MongoDB...')

    try {
        await Mongoose.connect(`mongodb+srv://${username}:${password}@${host}${port ? `:${port}` : ''}/${database}`, {
            useNewUrlParser: true, 
            useUnifiedTopology: true
        });
        
        console.log('[DATABASE] Connected to the MongoDB!')
    
        return Mongoose.connection
    }
    catch(error) {
        console.error('[DATABASE] Unable to connect to the MongoDB:', error)
    }

    return null
}

module.exports = {
    connectPostgres,
    connectMongo
}
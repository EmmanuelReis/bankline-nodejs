const Sequelize = require('sequelize')
const Mongoose = require('mongoose')

const connectPostgres = () => {
    console.log('[DATABASE] Connecting to the Postgres...')
        
    const conn = new Sequelize(require('#database/config/postgres'))

    console.log('[DATABASE] Connected to the Postgres!')

    return conn
}

const connectMongo = async() => {
    const { username, password, database, host, port } = require('#database/config/mongo')

    console.log('[DATABASE] Connecting to the MongoDB...')

    await Mongoose.connect(`mongodb+srv://${username}:${password}@${host}${port ? `:${port}` : ''}/${database}`, {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    });
    
    console.log('[DATABASE] Connected to the MongoDB!')

    return Mongoose.connection
}

module.exports = {
    connectPostgres,
    connectMongo
}
require('dotenv').config()

const Hapi = require('@hapi/hapi')
const routes = require('#routes')

const server = Hapi.server({
    host: process.env.APPLICATION_HOST,
    port: process.env.APPLICATION_PORT
})

server.route(routes)

;
(async() => {
    console.log('[SERVER] Starting...')

    await server.start()

    console.log(`[SERVER] Running on ${server.info.uri}`)
})()
require('dotenv').config()

const Hapi = require('@hapi/hapi')
const AuthLib = require('hapi-auth-jwt2')
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const Joi = require('joi')

const routes = require('#routes')
const { connectMongo } = require('#database/conn')
const { validate } = require('#auth')

const server = Hapi.server({
    host: process.env.APPLICATION_HOST,
    port: process.env.APPLICATION_PORT
})

;
(async() => {
    await connectMongo()
    
    console.log('[SERVER] Starting...')

    const swaggerOptions = {
        info: {
            title: 'Bankline Cabras do agREST API Documentation',
            version: 'v1',
        },
    };

    await server.register([ Inert, Vision, { plugin: HapiSwagger, options: swaggerOptions }, AuthLib ]);

    server.auth.strategy('jwt', 'jwt', {
        key: process.env.SECRET_KEY,
        validate,
        verifyOptions: { 
            algorithms: ['HS256']
        }
    });

    server.auth.default('jwt');

    server.route({
        method: 'GET',
        path: '/',
        config: {
            auth: false,
            description: 'Home',
            notes: 'Welcome',
            tags: ['api'],
            response: {
                schema: Joi.object({
                    message: "Welcome to Bankline! by: Cabras do agREST" 
                }).label('Result')
            }
        },
        handler: (req, h) => h
                            .response({ message: "Welcome to Bankline! by: Cabras do agREST" })
                            .location(`http://${process.env.APPLICATION_HOST}:${process.env.APPLICATION_PORT}/login`)
                            .code(200)
    })
    server.route(routes)
    
    await server.start()

    console.log(`[SERVER] Running on ${server.info.uri}`)
})()
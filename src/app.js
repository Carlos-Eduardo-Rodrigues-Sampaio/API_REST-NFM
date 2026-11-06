import fastify from 'fastify';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import usuarioRoutes from './usuarios/routes/usuarioRoutes.js';
import enderecoRoutes from './usuarios/enderecos/routes/enderecoRoutes.js';
import pool from './usuarios/database/connection.js';

const app = fastify({
    logger: true
})

app.register(swagger, {
    openapi: {
        openapi: '3.0.3',
        info: {
            title: 'API REST NFM',
            description: 'API de usuários e endereços (Fastify + MySQL).',
            version: '1.0.0'
        },
        tags: [
            { name: 'Usuários', description: 'Cadastro e manutenção de usuários' },
            { name: 'Endereços', description: 'Cadastro e manutenção de endereços' },
            { name: 'Saúde', description: 'Verificação do estado da API' }
        ]
    }
})

app.register(swaggerUi, {
    routePrefix: '/documentation'
})

async function healthRoutes(fastify) {
    fastify.get('/health', {
        schema: {
            tags: ['Saúde'],
            summary: 'Verifica a API e a conexão com o banco',
            response: {
                200: {
                    description: 'API e banco de dados funcionando',
                    type: 'object',
                    properties: {
                        status: { type: 'string' },
                        database: { type: 'string' }
                    }
                },
                503: {
                    description: 'API no ar, mas sem conexão com o banco',
                    type: 'object',
                    properties: {
                        status: { type: 'string' },
                        database: { type: 'string' }
                    }
                }
            }
        }
    }, async (request, reply) => {
        try {
            await pool.query('SELECT 1')

            return reply.send({ status: 'ok', database: 'connected' })
        } catch (error) {
            request.log.error(error)

            return reply.code(503).send({ status: 'error', database: 'disconnected' })
        }
    })
}

app.register(healthRoutes)

app.register(usuarioRoutes, {
    prefix: '/api/usuarios'
})

app.register(enderecoRoutes, {
    prefix: '/api/enderecos'
})

app.setErrorHandler((error, request, reply) => {
    request.log.error(error)

    if (error.validation) {
        return reply.code(400).send({
            message: 'Dados inválidos!',
            errors: error.validation
        })
    }

    if (
        Number.isInteger(error.statusCode) &&
        error.statusCode >= 400 &&
        error.statusCode < 500
    ) {
        return reply.code(error.statusCode).send({
            message: error.message
        })
    }

    return reply.code(500).send({
        message: 'Erro interno do servidor!'
    })
})

app.addHook('onClose', async () => {
    await pool.end()
})

export default app

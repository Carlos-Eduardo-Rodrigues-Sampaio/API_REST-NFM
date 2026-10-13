import fastify from 'fastify';
import usuarioRoutes from './usuarios/routes/usuarioRoutes.js';
import enderecoRoutes from './usuarios/enderecos/routes/enderecoRoutes.js';
import pool from './usuarios/database/connection.js';

const app = fastify({
    logger: true
})

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

    return reply.code(500).send({
        message: 'Erro interno do servidor!'
    })
})

app.addHook('onClose', async () => {
    await pool.end()
})

export default app
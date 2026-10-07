import usuarioController from '../controllers/usuarioController.js'

import {
    usuarioBodySchema,
    usuarioParamsSchema
} from '../schemas/usuarioSchema.js'

async function usuarioRoutes(fastify) {
    fastify.get('/', usuarioController.index)

    fastify.get('/:id',
        {
            schema: {
                params: usuarioParamsSchema
            }
        },
        usuarioController.show)

    fastify.post('/',
        {
            schema: {
                body: usuarioBodySchema
            }
        },
        usuarioController.store
    )

    fastify.put('/:id',
        {
            schema :{
                params: usuarioParamsSchema,
                body: usuarioBodySchema
            }
        },
        usuarioController.update
    )

    fastify.delete('/:id',
        {
            schema: {
                params: usuarioParamsSchema
            }
        },
        usuarioController.delete
    )
}

export default usuarioRoutes
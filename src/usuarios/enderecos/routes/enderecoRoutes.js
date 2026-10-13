import enderecoController from '../controllers/enderecoController.js';

import {
    enderecoBodySchema,
    enderecoParamsSchema
} from '../schemas/enderecoSchema.js'

async function enderecoRoutes(fastify) {
    fastify.get('/', enderecoController.index)

    fastify.get('/:id',
        {
            schema: {
                params: enderecoParamsSchema
            }
        },
        enderecoController.show)

    fastify.post('/',
        {
            schema: {
                body: enderecoBodySchema
            }
        },
        enderecoController.store
    )

    fastify.put('/:id',
        {
            schema :{
                params: enderecoParamsSchema,
                body: enderecoBodySchema
            }
        },
        enderecoController.update
    )

    fastify.delete('/:id',
        {
            schema: {
                params: enderecoParamsSchema
            }
        },
        enderecoController.delete
    )
}

export default enderecoRoutes
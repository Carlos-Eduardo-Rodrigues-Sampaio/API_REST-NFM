import enderecoController from '../controllers/enderecoController.js'

import {
    enderecoBodySchema,
    enderecoParamsSchema,
    enderecoUpdateBodySchema
} from '../schemas/enderecoSchema.js'

async function enderecoRoutes(fastify) {

    fastify.get(
        '/',
        enderecoController.index
    )

    fastify.get(
        '/:id',
        {
            schema: {
                params: enderecoParamsSchema
            }
        },
        enderecoController.show
    )

    fastify.post(
        '/',
        {
            schema: {
                body: enderecoBodySchema
            }
        },
        enderecoController.store
    )

    fastify.patch(
        '/:id',
        {
            schema: {
                params: enderecoParamsSchema,
                body: enderecoUpdateBodySchema
            }
        },
        enderecoController.update
    )

    fastify.delete(
        '/:id',
        {
            schema: {
                params: enderecoParamsSchema
            }
        },
        enderecoController.delete
    )
}

export default enderecoRoutes
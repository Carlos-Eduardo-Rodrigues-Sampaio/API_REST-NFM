import enderecoController from '../controllers/enderecoController.js'

import {
    enderecoBodySchema,
    enderecoParamsSchema,
    enderecoUpdateBodySchema,
    enderecoResponseSchema
} from '../schemas/enderecoSchema.js'

import {
    messageResponseSchema,
    validationErrorResponseSchema
} from '../../../shared/schemas/responseSchemas.js'

async function enderecoRoutes(fastify) {

    fastify.get(
        '/',
        {
            schema: {
                tags: ['Endereços'],
                summary: 'Lista todos os endereços',
                response: {
                    200: {
                        description: 'Lista de endereços',
                        type: 'array',
                        items: enderecoResponseSchema
                    }
                }
            }
        },
        enderecoController.index
    )

    fastify.get(
        '/:id',
        {
            schema: {
                tags: ['Endereços'],
                summary: 'Busca um endereço pelo id',
                params: enderecoParamsSchema,
                response: {
                    200: { description: 'Endereço encontrado', ...enderecoResponseSchema },
                    404: { description: 'Endereço não encontrado', ...messageResponseSchema }
                }
            }
        },
        enderecoController.show
    )

    fastify.post(
        '/',
        {
            schema: {
                tags: ['Endereços'],
                summary: 'Cadastra um endereço',
                body: enderecoBodySchema,
                response: {
                    201: { description: 'Endereço criado', ...enderecoResponseSchema },
                    400: { description: 'Dados inválidos', ...validationErrorResponseSchema }
                }
            }
        },
        enderecoController.store
    )

    fastify.patch(
        '/:id',
        {
            schema: {
                tags: ['Endereços'],
                summary: 'Atualiza parcialmente um endereço',
                description: 'Envie apenas os campos que deseja alterar; os demais são mantidos.',
                params: enderecoParamsSchema,
                body: enderecoUpdateBodySchema,
                response: {
                    200: { description: 'Endereço atualizado', ...enderecoResponseSchema },
                    400: { description: 'Dados inválidos', ...validationErrorResponseSchema },
                    404: { description: 'Endereço não encontrado', ...messageResponseSchema }
                }
            }
        },
        enderecoController.update
    )

    fastify.delete(
        '/:id',
        {
            schema: {
                tags: ['Endereços'],
                summary: 'Remove um endereço',
                params: enderecoParamsSchema,
                response: {
                    204: { description: 'Endereço removido', type: 'null' },
                    404: { description: 'Endereço não encontrado', ...messageResponseSchema }
                }
            }
        },
        enderecoController.delete
    )
}

export default enderecoRoutes

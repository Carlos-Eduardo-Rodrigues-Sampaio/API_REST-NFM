import usuarioController from '../controllers/usuarioController.js'
import enderecoController from '../enderecos/controllers/enderecoController.js'

import {
    usuarioCreateBodySchema,
    usuarioUpdateBodySchema,
    usuarioSenhaBodySchema,
    usuarioParamsSchema,
    usuarioResponseSchema
} from '../schemas/usuarioSchema.js'

import { enderecoResponseSchema } from '../enderecos/schemas/enderecoSchema.js'

import {
    messageResponseSchema,
    validationErrorResponseSchema
} from '../../shared/schemas/responseSchemas.js'

async function usuarioRoutes(fastify) {
    fastify.get('/',
        {
            schema: {
                tags: ['Usuários'],
                summary: 'Lista todos os usuários',
                response: {
                    200: {
                        description: 'Lista de usuários',
                        type: 'array',
                        items: usuarioResponseSchema
                    }
                }
            }
        },
        usuarioController.index)

    fastify.get('/:id',
        {
            schema: {
                tags: ['Usuários'],
                summary: 'Busca um usuário pelo id',
                params: usuarioParamsSchema,
                response: {
                    200: { description: 'Usuário encontrado', ...usuarioResponseSchema },
                    404: { description: 'Usuário não encontrado', ...messageResponseSchema }
                }
            }
        },
        usuarioController.show)

    fastify.get('/:id/enderecos',
        {
            schema: {
                tags: ['Usuários', 'Endereços'],
                summary: 'Lista os endereços de um usuário',
                params: usuarioParamsSchema,
                response: {
                    200: {
                        description: 'Endereços do usuário (principal primeiro)',
                        type: 'array',
                        items: enderecoResponseSchema
                    },
                    404: { description: 'Usuário não encontrado', ...messageResponseSchema }
                }
            }
        },
        enderecoController.indexByUsuario)

    fastify.post('/',
        {
            schema: {
                tags: ['Usuários'],
                summary: 'Cadastra um usuário',
                description: 'Recebe a senha em texto; a API grava apenas o hash (bcrypt).',
                body: usuarioCreateBodySchema,
                response: {
                    201: { description: 'Usuário criado', ...usuarioResponseSchema },
                    400: { description: 'Dados inválidos', ...validationErrorResponseSchema }
                }
            }
        },
        usuarioController.store
    )

    fastify.put('/:id',
        {
            schema: {
                tags: ['Usuários'],
                summary: 'Atualiza os dados de um usuário',
                description: 'Atualiza os dados cadastrais. A senha não é alterada aqui: use PATCH /{id}/senha.',
                params: usuarioParamsSchema,
                body: usuarioUpdateBodySchema,
                response: {
                    200: { description: 'Usuário atualizado', ...usuarioResponseSchema },
                    400: { description: 'Dados inválidos', ...validationErrorResponseSchema },
                    404: { description: 'Usuário não encontrado', ...messageResponseSchema }
                }
            }
        },
        usuarioController.update
    )

    fastify.patch('/:id/senha',
        {
            schema: {
                tags: ['Usuários'],
                summary: 'Altera a senha de um usuário',
                description: 'Exige a senha atual e a nova senha.',
                params: usuarioParamsSchema,
                body: usuarioSenhaBodySchema,
                response: {
                    204: { description: 'Senha alterada', type: 'null' },
                    400: { description: 'Dados inválidos', ...validationErrorResponseSchema },
                    401: { description: 'Senha atual incorreta', ...messageResponseSchema },
                    404: { description: 'Usuário não encontrado', ...messageResponseSchema }
                }
            }
        },
        usuarioController.updatePassword
    )

    fastify.delete('/:id',
        {
            schema: {
                tags: ['Usuários'],
                summary: 'Remove um usuário',
                params: usuarioParamsSchema,
                response: {
                    204: { description: 'Usuário removido', type: 'null' },
                    404: { description: 'Usuário não encontrado', ...messageResponseSchema }
                }
            }
        },
        usuarioController.delete
    )
}

export default usuarioRoutes

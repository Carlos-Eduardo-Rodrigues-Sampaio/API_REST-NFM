// Schemas de resposta reutilizáveis (usados principalmente na documentação Swagger).
//
// Os objetos de sucesso usam `additionalProperties: true` de propósito:
// assim o Swagger mostra o formato da resposta sem que o Fastify altere
// o JSON que a API já devolve (datas, tinyint etc.).

export const messageResponseSchema = {
    type: 'object',

    properties: {
        message: {
            type: 'string'
        }
    }
}

export const validationErrorResponseSchema = {
    type: 'object',

    properties: {
        message: {
            type: 'string'
        },

        errors: {
            type: 'array',
            items: {
                type: 'object',
                additionalProperties: true
            }
        }
    }
}

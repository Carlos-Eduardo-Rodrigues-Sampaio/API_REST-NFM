export const usuarioParamsSchema = {
    type: 'object',

    properties: {
        id: {
            type: 'string',
            format: 'uuid'
        }
    },

    required: ['id'],

    additionalProperties: false
}

export const usuarioBodySchema = {
    type: 'object',

    properties: {
        nome: {
            type: 'string',
            minLength: 2,
            maxLength: 100
        },

        email: {
            type: 'string',
            format: 'email',
            maxLength: 150
        },

        senha_hash: {
            type: 'string',
            minLength: 1,
            maxLength: 255
        },

        cpf: {
            type: 'string',
            pattern: '^[0-9]{11}$'
        },

        data_nascimento: {
            type: 'string',
            format: 'date'
        },

        sexo: {
            type: 'string',
            minLength: 1,
            maxLength: 20
        },

        telefone: {
            type: 'string',
            maxLength: 20
        },

        status: {
            type: 'string',
            enum: ['ATIVO', 'INATIVO', 'BLOQUEADO']
        }

    },

    required: [
        'nome',
        'email',
        'senha_hash',
        'cpf',
        'data_nascimento',
        'sexo'
    ],

    additionalProperties: false
}
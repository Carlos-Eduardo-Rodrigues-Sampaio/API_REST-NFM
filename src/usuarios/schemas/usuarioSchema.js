import { format } from "mysql2"

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
            minLenght: 2,
            maxLenght: 100
        },

        email: {
            type: 'string',
            format: 'email',
            maxLenght: '150'
        },

        senha_hash: {
            type: 'string',
            minLenght: '1',
            maxLenght: '255'
        },

        cpf: {
            type: 'string',
            pattern: '[0-9]{11}$'
        },

        data_nascimento: {
            type: 'string',
            format: 'date'
        },

        sexo: {
            type: 'string',
            minLenght: '1',
            maxLenght: '20'
        },

        telefone: {
            type: 'string',
            maxLenght: '20'
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
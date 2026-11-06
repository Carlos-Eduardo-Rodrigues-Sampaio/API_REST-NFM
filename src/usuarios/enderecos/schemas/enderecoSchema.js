export const enderecoParamsSchema = {
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

const enderecoProperties = {
    usuario_id: {
        type: 'string',
        format: 'uuid'
    },

    logradouro: {
        type: 'string',
        minLength: 2,
        maxLength: 250
    },

    numero: {
        type: 'string',
        minLength: 1,
        maxLength: 20
    },

    complemento: {
        type: ['string', 'null'],
        maxLength: 250
    },

    bairro: {
        type: 'string',
        minLength: 2,
        maxLength: 250
    },

    cidade: {
        type: 'string',
        minLength: 2,
        maxLength: 250
    },

    estado: {
        type: 'string',
        minLength: 2,
        maxLength: 250
    },

    cep: {
        type: 'string',
        pattern: '^\\d{5}-?\\d{3}$'
    },

    pais: {
        type: 'string',
        minLength: 2,
        maxLength: 250
    },

    endereco_principal: {
        type: 'boolean'
    },

    endereco_cobranca: {
        type: 'boolean'
    }
}

export const enderecoBodySchema = {
    type: 'object',

    properties: enderecoProperties,

    required: [
        'usuario_id',
        'logradouro',
        'numero',
        'bairro',
        'cidade',
        'estado',
        'cep',
        'pais'
    ],

    additionalProperties: false
}

export const enderecoUpdateBodySchema = {
    type: 'object',

    properties: {
        logradouro: enderecoProperties.logradouro,
        numero: enderecoProperties.numero,
        complemento: enderecoProperties.complemento,
        bairro: enderecoProperties.bairro,
        cidade: enderecoProperties.cidade,
        estado: enderecoProperties.estado,
        cep: enderecoProperties.cep,
        pais: enderecoProperties.pais,
        endereco_principal: enderecoProperties.endereco_principal,
        endereco_cobranca: enderecoProperties.endereco_cobranca
    },

    required: [],

    minProperties: 1,

    additionalProperties: false
}

export const enderecoResponseSchema = {
    type: 'object',

    properties: {
        id: { type: 'string', format: 'uuid' },
        usuario_id: { type: 'string', format: 'uuid' },
        logradouro: { type: 'string' },
        numero: { type: 'string' },
        complemento: { type: ['string', 'null'] },
        bairro: { type: 'string' },
        cidade: { type: 'string' },
        estado: { type: 'string' },
        cep: { type: 'string' },
        pais: { type: 'string' },
        endereco_principal: { type: 'integer' },
        endereco_cobranca: { type: 'integer' },
        data_criacao: { type: 'string', format: 'date-time' },
        data_atualizacao: { type: 'string', format: 'date-time' }
    },

    additionalProperties: true
}
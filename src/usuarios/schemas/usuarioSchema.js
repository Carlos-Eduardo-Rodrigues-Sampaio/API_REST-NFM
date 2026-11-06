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

const usuarioProperties = {
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
}

const senhaProperty = {
    type: 'string',
    minLength: 8,
    maxLength: 72
}

export const usuarioCreateBodySchema = {
    type: 'object',

    properties: {
        ...usuarioProperties,

        senha: senhaProperty
    },

    required: [
        'nome',
        'email',
        'senha',
        'cpf',
        'data_nascimento',
        'sexo'
    ],

    additionalProperties: false
}

export const usuarioUpdateBodySchema = {
    type: 'object',

    properties: usuarioProperties,

    required: [
        'nome',
        'email',
        'cpf',
        'data_nascimento',
        'sexo'
    ],

    additionalProperties: false
}

export const usuarioSenhaBodySchema = {
    type: 'object',

    properties: {
        senha_atual: {
            type: 'string',
            minLength: 1,
            maxLength: 72
        },

        nova_senha: senhaProperty
    },

    required: ['senha_atual', 'nova_senha'],

    additionalProperties: false
}

export const usuarioResponseSchema = {
    type: 'object',

    properties: {
        id: { type: 'string', format: 'uuid' },
        nome: { type: 'string' },
        email: { type: 'string' },
        cpf: { type: 'string' },
        data_nascimento: { type: 'string', format: 'date' },
        sexo: { type: 'string' },
        telefone: { type: ['string', 'null'] },
        status: { type: 'string', enum: ['ATIVO', 'INATIVO', 'BLOQUEADO'] },
        data_criacao: { type: 'string', format: 'date-time' },
        data_atualizacao: { type: 'string', format: 'date-time' }
    },

    additionalProperties: true
}

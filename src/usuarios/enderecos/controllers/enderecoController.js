import enderecoRepository from '../repositories/enderecoRepository.js';

class EnderecoRepository {
    async index(request, reply) {
        const enderecos = await enderecoRepository.findAll();

        return reply.send(enderecos)
    }

    async show(request, reply) {
        const { id } = request.params

        const endereco = await enderecoRepository.findById(id)

        if(!endereco) {
            return reply.code(404).send({
                message: 'Endereço não encontrado!'
            })
        }
    }

    async store(request, reply) {
        const {
            usuario_id,
                logradouro,
                numero,
                complemento,
                bairro,
                cidade,
                estado,
                cep,
                pais,
                endereco_principal,
                endereco_cobranca
        } = request.body

        const endereco = await enderecoRepository.create({
            usuario_id,
            logradouro,                
            numero,
            complemento,
            bairro,
            cidade,
            estado,
            cep,
            pais,
            endereco_principal,
            endereco_cobranca
        })

        return reply.code(201).send(endereco)
    }

    async update(request, reply) {
        const { id } = request.params
        const {
            usuario_id,
            logradouro,
            numero,
            complemento,
            bairro,
            cidade,
            estado,
            cep,
            pais,
            endereco_principal,
            endereco_cobranca
        } = request.body

        const endereco = await enderecoRepository.update(id, {
            usuario_id,
            logradouro,
            numero,
            complemento,
            bairro,
            cidade,
            estado,
            cep,
            pais,
            endereco_principal,
            endereco_cobranca
        })

        if(!endereco) {
            return reply.code(404).send({
                message: 'Endereço não encontrado!'
            })
        }

        return reply.send(endereco)
    }

    async delete(request, reply) {
        const { id } = request.params

        const deleted = await enderecoRepository.delete(id)

        if(!deleted) {
            return reply.code(404).send({
                message: 'Endereço não encontrado!'
            })
        }

        return reply.code(204).send()
    }

}

export default new EnderecoRepository()
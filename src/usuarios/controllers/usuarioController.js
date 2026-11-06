import usuarioRepository from '../repositories/usuarioRepository.js'
import { hashPassword, verifyPassword } from '../utils/password.js'

class UsuarioController {
    async index(request, reply) {
        const usuarios = await usuarioRepository.findAll()

        return reply.send(usuarios)
    }

    async show(request, reply) {
        const { id } = request.params

        const usuario = await usuarioRepository.findById(id)

        if (!usuario) {
            return reply.code(404).send({
                message: 'Usuário não encontrado!'
            })
        }

        return reply.send(usuario)
    }

    async store(request, reply) {
        const {
            nome,
            email,
            senha,
            cpf,
            data_nascimento,
            sexo,
            telefone,
            status
        } = request.body

        const senha_hash = await hashPassword(senha)

        const usuario = await usuarioRepository.create({
            nome,
            email,
            senha_hash,
            cpf,
            data_nascimento,
            sexo,
            telefone,
            status: status ?? 'ATIVO'
        })

        return reply.code(201).send(usuario)
    }

    async update(request, reply) {
        const { id } = request.params
        const {
            nome,
            email,
            cpf,
            data_nascimento,
            sexo,
            telefone,
            status
        } = request.body

        const usuario = await usuarioRepository.update(id, {
            nome,
            email,
            cpf,
            data_nascimento,
            sexo,
            telefone,
            status
        })

        if (!usuario) {
            return reply.code(404).send({
                message: 'Usuário não encontrado!'
            })
        }

        return reply.send(usuario)
    }

    async updatePassword(request, reply) {
        const { id } = request.params
        const { senha_atual, nova_senha } = request.body

        const senhaHashAtual = await usuarioRepository.findSenhaHashById(id)

        if (!senhaHashAtual) {
            return reply.code(404).send({
                message: 'Usuário não encontrado!'
            })
        }

        const senhaCorreta = await verifyPassword(senha_atual, senhaHashAtual)

        if (!senhaCorreta) {
            return reply.code(401).send({
                message: 'Senha atual incorreta!'
            })
        }

        const novoHash = await hashPassword(nova_senha)

        await usuarioRepository.updatePassword(id, novoHash)

        return reply.code(204).send()
    }

    async delete(request, reply) {
        const { id } = request.params

        const deleted = await usuarioRepository.delete(id)

        if (!deleted) {
            return reply.code(404).send({
                message: 'Usuário não encontrado!'
            })
        }

        return reply.code(204).send()
    }
}

export default new UsuarioController()

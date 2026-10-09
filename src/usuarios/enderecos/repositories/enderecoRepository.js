import { randomUUID } from 'crypto'
import pool from '../database/connection.js'

class EnderecoRepository {

    async findAll() {
        const [rows] = await pool.execute(`
            SELECT
                id,
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
                endereco_cobranca,
                data_criacao,
                data_atualizacao
            FROM endereco_usuario
            ORDER BY usuario_id
        `)

        return rows
    }

    async findById(id) {
        const [rows] = await pool.execute(`
            SELECT
                id,
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
                endereco_cobranca,
                data_criacao,
                data_atualizacao
            FROM endereco_usuario
            WHERE id = ?
        `, [id])

        return rows[0] ?? null
    }

    async findByUsuarioId(usuario_id) {
        const [rows] = await pool.execute(`
            SELECT
                id,
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
                endereco_cobranca,
                data_criacao,
                data_atualizacao
            FROM endereco_usuario
            WHERE usuario_id = ?
            ORDER BY endereco_principal DESC, data_criacao DESC
        `, [usuario_id])

        return rows
    }

    async create({
        usuario_id,
        logradouro,
        numero,
        complemento,
        bairro,
        cidade,
        estado,
        cep,
        pais,
        endereco_principal = 0,
        endereco_cobranca = 0
    }) {
        const id = randomUUID()

        await pool.execute(`
            INSERT INTO endereco_usuario (
                id,
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
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [
            id,
            usuario_id,
            logradouro,
            numero,
            complemento ?? null,
            bairro,
            cidade,
            estado,
            cep,
            pais,
            endereco_principal,
            endereco_cobranca
        ])

        return this.findById(id)
    }

    async update(
        id,
        {
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
        }
    ) {
        const [result] = await pool.execute(`
            UPDATE endereco_usuario
            SET
                logradouro = ?,
                numero = ?,
                complemento = ?,
                bairro = ?,
                cidade = ?,
                estado = ?,
                cep = ?,
                pais = ?,
                endereco_principal = ?,
                endereco_cobranca = ?
            WHERE id = ?
        `, [
            logradouro,
            numero,
            complemento ?? null,
            bairro,
            cidade,
            estado,
            cep,
            pais,
            endereco_principal,
            endereco_cobranca,
            id
        ])

        if (result.affectedRows === 0) {
            return null
        }

        return this.findById(id)
    }

    async delete(id) {
        const [result] = await pool.execute(`
            DELETE FROM endereco_usuario
            WHERE id = ?
        `, [id])

        return result.affectedRows > 0
    }
}

export default new EnderecoRepository()
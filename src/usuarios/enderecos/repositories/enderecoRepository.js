import { randomUUID } from "crypto";
import pool from './usuarios/database/connection.js';

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

    async create({
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
                pais
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `)
    }
}
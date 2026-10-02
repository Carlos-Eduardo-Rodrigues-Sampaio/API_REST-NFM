import { randomUUID } from 'crypto'
import pool from '../database/connection.js'

class UsuarioRepository {
  async findAll() {
    const [rows] = await pool.execute(`
      SELECT
        id,
        nome,
        email,
        cpf,
        data_nascimento,
        sexo,
        telefone,
        status,
        data_criacao,
        data_atualizacao
      FROM usuario
      ORDER BY nome
    `)

    return rows
  }

  async findById(id) {
    const [rows] = await pool.execute(`
      SELECT
        id,
        nome,
        email,
        cpf,
        data_nascimento,
        sexo,
        telefone,
        status,
        data_criacao,
        data_atualizacao
      FROM usuario
      WHERE id = ?
    `, [id])

    return rows[0] ?? null
  }

  async findByEmail(email) {
    const [rows] = await pool.execute(`
      SELECT
        id,
        nome,
        email,
        cpf,
        data_nascimento,
        sexo,
        telefone,
        status,
        data_criacao,
        data_atualizacao
      FROM usuario
      WHERE email = ?
    `, [email])

    return rows[0] ?? null
  }

  async findByCpf(cpf) {
    const [rows] = await pool.execute(`
      SELECT
        id,
        nome,
        email,
        cpf,
        data_nascimento,
        sexo,
        telefone,
        status,
        data_criacao,
        data_atualizacao
      FROM usuario
      WHERE cpf = ?
    `, [cpf])

    return rows[0] ?? null
  }

  async create({
    nome,
    email,
    senha_hash,
    cpf,
    data_nascimento,
    sexo,
    telefone,
    status = 'ATIVO'
  }) {
    const id = randomUUID()

    await pool.execute(`
      INSERT INTO usuario (
        id,
        nome,
        email,
        senha_hash,
        cpf,
        data_nascimento,
        sexo,
        telefone,
        status
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      id,
      nome,
      email,
      senha_hash,
      cpf,
      data_nascimento,
      sexo,
      telefone ?? null,
      status
    ])

    return this.findById(id)
  }

  async update(id, {
    nome,
    email,
    cpf,
    data_nascimento,
    sexo,
    telefone,
    status
  }) {
    const [result] = await pool.execute(`
      UPDATE usuario
      SET
        nome = ?,
        email = ?,
        cpf = ?,
        data_nascimento = ?,
        sexo = ?,
        telefone = ?,
        status = ?
      WHERE id = ?
    `, [
      nome,
      email,
      cpf,
      data_nascimento,
      sexo,
      telefone ?? null,
      status,
      id
    ])

    if (result.affectedRows === 0) {
      return null
    }

    return this.findById(id)
  }

  async updatePassword(id, senha_hash) {
    const [result] = await pool.execute(`
      UPDATE usuario
      SET senha_hash = ?
      WHERE id = ?
    `, [senha_hash, id])

    if (result.affectedRows === 0) {
      return null
    }

    return this.findById(id)
  }

  async updateStatus(id, status) {
    const [result] = await pool.execute(`
      UPDATE usuario
      SET status = ?
      WHERE id = ?
    `, [status, id])

    if (result.affectedRows === 0) {
      return null
    }

    return this.findById(id)
  }

  async delete(id) {
    const [result] = await pool.execute(`
      DELETE FROM usuario
      WHERE id = ?
    `, [id])

    return result.affectedRows > 0
  }
}

export default new UsuarioRepository()
import bcrypt from 'bcryptjs'

// Custo do hash: quanto maior, mais seguro (e mais lento).
const SALT_ROUNDS = 10

export function hashPassword(senha) {
    return bcrypt.hash(senha, SALT_ROUNDS)
}

export function verifyPassword(senha, senhaHash) {
    return bcrypt.compare(senha, senhaHash)
}

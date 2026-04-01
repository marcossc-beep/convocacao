import Fastify from 'fastify'
import { Pool } from 'pg'

const sql = new Pool({
    user: 'postgres',
    password: 'senai',
    host: 'localhost',
    port: 5432,
    database: 'selecao'
})

const servidor = Fastify()

servidor.get('/convocados', async () => {
    const resultado = await sql.query('select * from convocacao')
    return resultado.rows
})

servidor.post('/convocacao', async (request) => {
    const body = request.body
    const resultado = await sql.query(
        'INSERT INTO convocacao (nome, posicao) VALUES ($1, $2)',
        [body.nome, body.posicao]
    );
    return {mensagem: "Deu boa feio!"}
})

servidor.put('/convocacao/:id', async (request) => {
    const body = request.body
    const id = request.params.id
    const resultado = await sql.query(
        'UPDATE convocacao set nome = $1, posicao = $2 WHERE id = $3',
        [body.nome, body.posicao, id]
    )
    return {mensagem: "Deu boa feio!"}
})

servidor.delete('/convocacao/:id', async (request) => {
    const id = request.params.id;
    const resultado = await sql.query(
        'DELETE FROM convocacao where id = $1',
        [id]
    )
    return {mensagem: "Deu boa feio!"}
})

servidor.listen({
    port: 3000
})
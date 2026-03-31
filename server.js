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

servidor.listen({
    port: 3000
})
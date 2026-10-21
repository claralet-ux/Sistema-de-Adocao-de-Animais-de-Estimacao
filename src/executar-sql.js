const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
require('dotenv').config();

async function main() {
    const arquivo = process.argv[2];
    if (!arquivo) {
        console.log('Uso: node src/executar-sql.js schema.sql');
        return;
    }

    const conexao = await mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        ssl: { rejectUnauthorized: false },
        multipleStatements: true
    });

    const sql = fs.readFileSync(path.resolve(arquivo), 'utf8');
    await conexao.query(sql);
    console.log(`${arquivo} executado com sucesso!`);
    await conexao.end();
}

main().catch(erro => {
    console.error('Erro:', erro.message);
});
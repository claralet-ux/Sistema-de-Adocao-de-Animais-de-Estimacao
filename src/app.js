const express = require('express');
const db = require('./database');

const app = express();

app.get('/', (req, res) => {
    res.send('Sistema de Adoção de Animais funcionando!');
});

app.get('/teste-db', async (req, res) => {
    try {
        const [resultado] = await db.query('SELECT 1 AS conectado');

        res.json({
            mensagem: 'Conexão com o MySQL funcionando!',
            resultado: resultado
        });

    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            mensagem: 'Erro na conexão com o banco!',
            erro: erro.message
        });
    }
});

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});

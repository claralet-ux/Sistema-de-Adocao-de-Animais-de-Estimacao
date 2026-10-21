const express = require('express');
const path = require('path');
const db = require('./database');

const app = express();

// EJS e arquivos estáticos (CSS)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// ---------- ROTAS PÚBLICAS ----------

// Home: lista de animais disponíveis (com filtro opcional por espécie)
app.get('/', async (req, res) => {
    try {
        const especie = req.query.especie;
        let sql = "SELECT * FROM animais WHERE status = 'disponivel'";
        const params = [];

        if (especie) {
            sql += ' AND especie = ?';
            params.push(especie);
        }
        sql += ' ORDER BY cadastrado_em DESC';

        const [animais] = await db.query(sql, params);
        res.render('home', { titulo: 'Animais para adoção', animais, especie });
    } catch (erro) {
        console.error(erro);
        res.status(500).render('erro', {
            titulo: 'Erro',
            mensagem: 'Não foi possível carregar os animais. Tente novamente mais tarde.'
        });
    }
});

// Detalhes de um animal
app.get('/animais/:id', async (req, res) => {
    try {
        const [linhas] = await db.query(
            `SELECT a.*, u.nome AS responsavel
             FROM animais a
             LEFT JOIN usuarios u ON u.id = a.cadastrado_por
             WHERE a.id = ?`,
            [req.params.id]
        );

        if (linhas.length === 0) {
            return res.status(404).render('erro', {
                titulo: 'Não encontrado',
                mensagem: 'Animal não encontrado.'
            });
        }

        res.render('detalhes', { titulo: linhas[0].nome, animal: linhas[0] });
    } catch (erro) {
        console.error(erro);
        res.status(500).render('erro', {
            titulo: 'Erro',
            mensagem: 'Não foi possível carregar o animal.'
        });
    }
});

// Sobre
app.get('/sobre', (req, res) => {
    res.render('sobre', { titulo: 'Sobre o projeto' });
});

// Teste de conexão com o banco (pode remover depois)
app.get('/teste-db', async (req, res) => {
    try {
        const [resultado] = await db.query('SELECT 1 AS conectado');
        res.json({ mensagem: 'Conexão com o MySQL funcionando!', resultado });
    } catch (erro) {
        console.error(erro);
        res.status(500).json({ mensagem: 'Erro na conexão com o banco!', erro: erro.message });
    }
});

// Página 404 para qualquer rota inexistente
app.use((req, res) => {
    res.status(404).render('erro', { titulo: 'Não encontrado', mensagem: 'Página não encontrada.' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

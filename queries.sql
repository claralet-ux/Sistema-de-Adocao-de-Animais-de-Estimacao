-- =====================================================
-- queries.sql - consultas usadas pelas páginas públicas
-- =====================================================

-- Home: animais disponíveis (mais recentes primeiro)
SELECT * FROM animais WHERE status = 'disponivel' ORDER BY cadastrado_em DESC;

-- Home com filtro por espécie
SELECT * FROM animais WHERE status = 'disponivel' AND especie = 'cachorro' ORDER BY nome;

-- Detalhes de um animal (com quem cadastrou, se houver)
SELECT a.*, u.nome AS responsavel
FROM animais a
LEFT JOIN usuarios u ON u.id = a.cadastrado_por
WHERE a.id = 1;

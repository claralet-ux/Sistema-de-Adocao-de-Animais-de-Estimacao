-- =====================================================
-- seeds.sql - dados de teste
-- (usuários serão criados pelo formulário de registro na Entrega 3,
--  para que a senha já seja salva com bcrypt)
-- =====================================================

INSERT INTO animais (nome, especie, raca, sexo, porte, idade_meses, descricao) VALUES
('Thor',    'cachorro', 'SRD',          'M', 'grande',  24, 'Muito brincalhão e carinhoso. Adora passear e se dá bem com crianças.'),
('Luna',    'gato',     'SRD',          'F', 'pequeno', 8,  'Gatinha curiosa e dócil, já castrada e vacinada.'),
('Mel',     'cachorro', 'Labrador',     'F', 'grande',  36, 'Calma e obediente, ótima companhia para famílias.'),
('Simba',   'gato',     'Laranja',      'M', 'pequeno', 14, 'Sociável, gosta de colo e convive bem com outros gatos.'),
('Bolinha', 'cachorro', 'Poodle',       'M', 'pequeno', 60, 'Cãozinho tranquilo, ideal para apartamento.'),
('Nina',    'cachorro', 'SRD',          'F', 'medio',   12, 'Cheia de energia, precisa de espaço para correr e brincar.'),
('Mia',     'gato',     'Siamês',       'F', 'pequeno', 30, 'Independente e muito inteligente.'),
('Pipoca',  'outro',    'Coelho',       'M', 'pequeno', 10, 'Coelhinho manso, acostumado com manuseio.'),
('Rex',     'cachorro', 'Pastor Alemão','M', 'grande',  48, 'Leal e protetor, precisa de tutor com experiência.'),
('Cacau',   'gato',     'SRD',          'F', 'pequeno', 5,  'Filhote muito brincalhona, resgatada na rua.');

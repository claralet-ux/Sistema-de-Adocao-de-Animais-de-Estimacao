-- =====================================================
-- schema.sql - Sistema de Adoção de Animais de Estimação
-- Execute no banco do Aiven (DBeaver / MySQL Workbench)
-- =====================================================

-- Usuários da área restrita (login será implementado na Entrega 3)
CREATE TABLE IF NOT EXISTS usuarios (
    id            INT AUTO_INCREMENT PRIMARY KEY,
    nome          VARCHAR(100) NOT NULL,
    email         VARCHAR(150) NOT NULL UNIQUE,
    senha_hash    VARCHAR(255) NOT NULL,          -- hash do bcrypt
    criado_em     DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Animais disponíveis para adoção
CREATE TABLE IF NOT EXISTS animais (
    id            INT AUTO_INCREMENT PRIMARY KEY,
    nome          VARCHAR(80)  NOT NULL,
    especie       VARCHAR(20)  NOT NULL,          -- 'cachorro', 'gato', 'outro'
    raca          VARCHAR(80)  NOT NULL DEFAULT 'SRD',
    sexo          CHAR(1)      NOT NULL,          -- 'M' ou 'F'
    porte         VARCHAR(10)  NOT NULL,          -- 'pequeno', 'medio', 'grande'
    idade_meses   INT          NOT NULL,
    descricao     TEXT         NOT NULL,
    foto_url      VARCHAR(255) NULL,
    status        VARCHAR(15)  NOT NULL DEFAULT 'disponivel',  -- 'disponivel' ou 'adotado'
    cadastrado_por INT         NULL,
    cadastrado_em DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_animais_usuario
        FOREIGN KEY (cadastrado_por) REFERENCES usuarios(id)
        ON DELETE SET NULL
);

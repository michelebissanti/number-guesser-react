CREATE TABLE IF NOT EXISTS goal (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255) NOT NULL,
    condition TEXT NOT NULL,
    description TEXT,
    icon VARCHAR(255),
    repeatable BOOLEAN NOT NULL DEFAULT FALSE
);

DROP TABLE user;

CREATE TABLE IF NOT EXISTS user (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    salt VARCHAR(255) NOT NULL
);

DROP TABLE user_goal;

CREATE TABLE IF NOT EXISTS user_goal (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date DATETIME NOT NULL,
    user_id INT NOT NULL,
    goal_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (goal_id) REFERENCES goal(id) ON DELETE CASCADE ON UPDATE CASCADE
);

DROP TABLE game;

CREATE TABLE IF NOT EXISTS game (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    difficulty INTEGER UNSIGNED NOT NULL,
    attempts_history TEXT NOT NULL,
    target_number INT NOT NULL,
    date DATETIME NOT NULL,
    user_id INT NOT NULL,
    status VARCHAR(255) NOT NULL DEFAULT 'in progress',
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- inserimento obiettivi
INSERT INTO goal (id, name, condition, description, icon, repeatable) VALUES
(1, 'Benvenuto', 'Completa la tua prima partita', 'Hai completato la tua prima partita, ben fatto!', '🎉', FALSE),
(2, 'Cervello acceso', 'Vinci la tua prima partita', 'Complimenti, hai vinto la tua prima partita!', '🧠', FALSE),
(3, 'Buccia di banana', 'Perdi la tua prima partita', 'Oh no, questa è stata la tua prima sconfitta!', '🍌', FALSE),
(4, 'Livello 1 Inizio', 'Vinci una partita a difficoltà 1', 'Bravo, hai completato una partita a difficoltà 1!', '⭐', FALSE),
(5, 'Livello 2 Inizio', 'Vinci una partita a difficoltà 2', 'Bravo, hai completato una partita a difficoltà 2!', '⭐⭐', FALSE),
(6, 'Livello 3 Inizio', 'Vinci una partita a difficoltà 3', 'Bravo, hai completato una partita a difficoltà 3!', '⭐⭐⭐', FALSE),
(7, 'Livello 4 Inizio', 'Vinci una partita a difficoltà 4', 'Bravo, hai completato una partita a difficoltà 4!', '⭐⭐⭐⭐', FALSE),
(8, 'Resistenza Livello 1', 'Vinci 10 partite a difficoltà 1', 'Ecco altre 10 vittorie a difficoltà 1, ottimo lavoro!', '💪', TRUE),
(9, 'Resistenza Livello 2', 'Vinci 10 partite a difficoltà 2', 'Ecco altre 10 vittorie a difficoltà 2, continua così!', '💪💪', TRUE),
(10, 'Resistenza Livello 3', 'Vinci 10 partite a difficoltà 3', 'Ecco altre 10 vittorie a difficoltà 3, sei bravissimo!', '💪💪💪', TRUE),
(11, 'Resistenza Livello 4', 'Vinci 10 partite a difficoltà 4', 'Ecco altre 10 vittorie a difficoltà 4, sei incredibile!', '💪💪💪💪', TRUE),
(12, 'Serie Fortunata Livello 1', 'Vinci 5 partite consecutive a difficoltà 1', 'Solo vittorie consecutive a difficoltà 1, incredibile!', '🔥', TRUE),
(13, 'Serie Fortunata Livello 2', 'Vinci 5 partite consecutive a difficoltà 2', 'Solo vittorie consecutive a difficoltà 2, fantastico!', '🔥🔥', TRUE),
(14, 'Serie Fortunata Livello 3', 'Vinci 5 partite consecutive a difficoltà 3', 'Solo vittorie consecutive a difficoltà 3, che genio!', '🔥🔥🔥', TRUE),
(15, 'Serie Fortunata Livello 4', 'Vinci 5 partite consecutive a difficoltà 4', 'Solo vittorie consecutive a difficoltà 4, sei una leggenda!', '🔥🔥🔥🔥', TRUE),
(16, 'Maratoneta', 'Gioca 20 partite totali', 'Hai dimostrato grande costanza, 20 partite giocate!', '🏃', FALSE),
(17, 'Instancabile', 'Gioca 50 partite totali', '50 partite giocate, che impegno!', '⏱️', TRUE),
(18, 'Indovino esperto', 'Indovina il numero al primo tentativo', 'Che intuizione! Hai indovinato al primo colpo!', '🔮', TRUE),
(19, 'Tenace', 'Vinci una partita all’ultimo tentativo possibile', 'Hai vinto all’ultimo colpo, bravo per la tenacia!', '⏳', TRUE),
(20, 'Maestro dei numeri', 'Vinci una partita a tutte le difficoltà (1-4)', 'Hai dimostrato di saper giocare a ogni livello!', '🥇', FALSE),
(21, 'Maestro dei numeri giornaliero', 'Vinci una partita a tutte le difficoltà (1-4) nello stesso giorno', 'Hai dominato ogni livello in un solo giorno, incredibile!', '🗓️', TRUE),
(22, 'Campione', 'Vinci 100 partite totali', 'Cento vittorie totali, sei un vero campione!', '🏆', FALSE),
(23, 'Ritorno vincente', 'Vinci una partita dopo 3 sconfitte consecutive', 'Non ti sei arreso e hai vinto, complimenti!', '⚡', TRUE),
(24, 'Leggenda', 'Vinci 50 partite consecutive', 'Cinquanta vittorie consecutive, sei una leggenda!', '👑', FALSE),
(25, 'Indovino Livello 1', 'Indovina al primo tentativo a difficoltà 1', 'Hai indovinato al primo colpo a difficoltà 1, che genio!', '🎯', TRUE),
(26, 'Indovino Livello 2', 'Indovina al primo tentativo a difficoltà 2', 'Hai indovinato al primo colpo a difficoltà 2, spettacolare!', '🎯🎯', TRUE),
(27, 'Indovino Livello 3', 'Indovina al primo tentativo a difficoltà 3', 'Hai indovinato al primo colpo a difficoltà 3, incredibile!', '🎯🎯🎯', TRUE),
(28, 'Indovino Livello 4', 'Indovina al primo tentativo a difficoltà 4', 'Hai indovinato al primo colpo a difficoltà 4, leggendario!', '🎯🎯🎯🎯', TRUE),
(29, 'Costante', 'Vinci una partita al giorno', 'Ogni giorno una vittoria, la costanza paga!', '📅', TRUE),
(30, 'Perseverante', 'Perdi una partita al giorno', 'Hai perso oggi, ma non arrenderti!', '😅', TRUE);

-- inserimento obiettivo 3 per utente 1 oggi
INSERT INTO user_goal (date, user_id, goal_id) VALUES ('2025-11-01', 1, 3);

-- inserimento obiettivo 8 per utente 1 oggi
INSERT INTO user_goal (date, user_id, goal_id) VALUES ('2025-11-01', 1, 8);

-- rimuove tutti i record di user 1 da user_goal
DELETE FROM user_goal WHERE user_id = 1;

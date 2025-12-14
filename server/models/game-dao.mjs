import { db } from '../db.mjs';
import { Goal, Game, Stat } from './models.mjs';

// funzione per ottenere tutti gli obiettivi dal database
export const getGoals = () => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM goal';
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
      }
      else {
        const goals = rows.map((g) => new Goal(g.id, g.name, g.condition, g.description, g.icon, Boolean(g.repeatable)));
        resolve(goals);
      }
    });
  });

}

// funzione per ottenere gli obiettivi di un utente dal database
// se conquistati vengono avvalorati i campi achieved e achievedAt
export const getGoalsByUser = (userId) => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT g.*, 
      MAX(ug.date) AS achievedAt, 
      CASE WHEN MAX(ug.user_id) IS NOT NULL THEN 1 ELSE 0 END AS achieved,
      COUNT(ug.goal_id) AS timeAchieved
      FROM goal g
      LEFT JOIN user_goal ug ON g.id = ug.goal_id AND ug.user_id = ?
      GROUP BY g.id;
    `;
    db.all(sql, [userId], (err, rows) => {
      if (err) {
        reject(err);
      }
      else {
        const goals = rows.map((g) => ({
          ...new Goal(g.id, g.name, g.condition, g.description, g.icon, Boolean(g.repeatable), Boolean(g.achieved), g.timeAchieved, g.achievedAt),
        }));

        resolve(goals);
      }
    });
  });
}

// funzione per aggiungere un obiettivo a un utente
export const addUserGoal = (userId, goalId, date, gameId) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO user_goal (user_id, goal_id, date) VALUES (?, ?, ?)';
    db.run(sql, [userId, goalId, date, gameId], function (err) {
      if (err) {
        reject(err);
      }
      else {
        resolve(this.lastID);
      }
    });
  });

}

// funzione per salvare una partita nel database
export const addGame = (difficulty, attemptsHistory, targetNumber, date, userId, status) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO game (difficulty, attempts_history, target_number, date, user_id, status) VALUES (?, ?, ?, ?, ?, ?)';
    db.run(sql, [difficulty, JSON.stringify(attemptsHistory), targetNumber, date, userId, status], function (err) {
      if (err) {
        reject(err);
      }
      else {
        resolve(this.lastID);
      }
    });
  });
}

// funzione per ottenere tutte le partite di un utente dal database
export const getGames = (userId) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM game WHERE user_id = ?';
    db.all(sql, [userId], (err, rows) => {
      if (err) {
        reject(err);
      }
      else {
        const games = rows.map((g) => new Game(g.id, g.difficulty, JSON.parse(g.attempts_history), g.target_number, g.date, g.user_id, g.status));
        resolve(games);
      }
    });
  });
}

// funzione per ottenere le statistiche di un utente dal database
// vengono raggruppate per difficoltà
export const getStats = (userId) => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT 
        difficulty,
        SUM(CASE WHEN status = 'won' THEN 1 ELSE 0 END) AS won,
        SUM(CASE WHEN status = 'lost' THEN 1 ELSE 0 END) AS lost
      FROM game
      WHERE user_id = ?
      GROUP BY difficulty
    `;
    db.all(sql, [userId], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        const stats = rows.map((row) => new Stat(row.difficulty, row.won, row.lost));
        resolve(stats);
      }
    });
  });
}

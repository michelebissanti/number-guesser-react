import dayjs from 'dayjs';

export const Status = {
    IN_PROGRESS: 'in_progress',
    WON: 'won',
    LOST: 'lost'
};

// modello per l'obiettivo
function Goal(id, name, condition, description, icon, repeatable = false, achieved = false, timeAchieved = null, achievedAt = null) {
    this.id = id;
    this.name = name;
    this.condition = condition;
    this.description = description;
    this.icon = icon;
    this.repeatable = repeatable;
    this.achieved = achieved;
    this.timeAchieved = timeAchieved;
    this.achievedAt = dayjs(achievedAt);
}

// modello per l'obiettivo dell'utente
function UserGoal(id, date, userId, goalId) {
    this.id = id;
    this.date = dayjs(date);
    this.userId = userId;
    this.goalId = goalId;
}

// modello per la singola partita
function Game(id, difficulty, attemptsHistory, targetNumber, date, userId, status) {
    this.id = id;
    this.difficulty = difficulty;
    this.attemptsHistory = attemptsHistory; // questo è un array di numeri
    this.targetNumber = targetNumber;
    this.date = dayjs(date);
    this.userId = userId;
    this.status = status;
}

// modello per le statistiche
function Stat(difficulty, lost, won) {
    this.difficulty = difficulty;
    this.lost = lost;
    this.won = won;
}

export { Goal, UserGoal, Game, Stat };
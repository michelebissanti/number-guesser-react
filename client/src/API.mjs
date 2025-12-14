import { Goal, Stat } from './models.mjs';

const SERVER_URL = 'http://localhost:3001';
//const SERVER_URL = 'http://192.168.1.120:3001';

// API per chiedere al server la lista di tutti gli obiettivi
const getGoals = async () => {
  const response = await fetch(SERVER_URL + '/api/goals');
  if (response.ok) {
    const goalsJson = await response.json();
    return goalsJson.map(g => new Goal(g.id, g.name, g.condition, g.description, g.icon, g.repeatable, g.achieved));
  }
  else {
    const errMessage = await response.json();
    throw errMessage;
  }
}

// API per chiedere al server la lista di tutti gli obiettivi di un utente (vengono avvalorati quelli raggiunti)
const getGoalsByUser = async (userId) => {
  const response = await fetch(`${SERVER_URL}/api/goals/${userId}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include'
  });

  if (response.ok) {
    const goalsJson = await response.json();
    return goalsJson.map(g => new Goal(g.id, g.name, g.condition, g.description, g.icon, g.repeatable, g.achieved, g.timeAchieved, g.achievedAt));
  }
  else {
    const errMessage = await response.json();
    throw errMessage;
  }
}

// API per chiedere al server le statistiche delle partite di un utente
const getStats = async (userId) => {
  const response = await fetch(`${SERVER_URL}/api/stats/${userId}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include'
  });

  if (response.ok) {
    const statsJson = await response.json();
    return statsJson.map(s => new Stat(s.difficulty, s.won, s.lost));
  }
  else {
    const errMessage = await response.json();
    throw errMessage;
  }
}

// API per inviare al server i dati della partita appena conclusa e ricevere la lista degli obiettivi raggiunti dopo la partita
const finishGame = async (difficulty, attemptsHistory, targetNumber, date, userId, status) => {
  const response = await fetch(SERVER_URL + '/api/game', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ difficulty, attemptsHistory, targetNumber, date, userId, status }),
    credentials: 'include'
  });

  if (response.ok) {
    const goalsJson = await response.json();
    return goalsJson.map(g => new Goal(g.id, g.name, g.condition, g.description, g.icon, g.repeatable, g.achieved, g.timeAchieved, g.achievedAt));
  } else {
    const errMessage = await response.json();
    throw errMessage;
  }

}

// API per effettuare il login
const logIn = async (credentials) => {
  const response = await fetch(SERVER_URL + '/api/sessions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(credentials),
  });
  if (response.ok) {
    const user = await response.json();
    return user;
  }
  else {
    const error = await response.json();
    throw error;
  }
};

// API per ottenere le informazioni dell'utente loggato
const getUserInfo = async () => {
  const response = await fetch(SERVER_URL + '/api/sessions/current', {
    method: 'GET',
    credentials: 'include',
  });

  if (response.ok) {
    const user = await response.json();
    return user;
  } else {
    const user = await response.json();
    throw user;
  }
};

// API per effettuare il logout
const logOut = async () => {
  const response = await fetch(SERVER_URL + '/api/sessions/current', {
    method: 'DELETE',
    credentials: 'include'
  });
  if (response.ok) {
    return null;
  } else {
    const errDetails = await response.json();
    throw errDetails;
  }
}

const API = { logIn, logOut, getUserInfo, getGoals, getGoalsByUser, finishGame, getStats };
export default API;
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { check, validationResult } from 'express-validator';
import { getGoals, addGame, getGoalsByUser, getStats } from './models/game-dao.mjs'
import { getUser, getUserById } from './models/user-dao.mjs';
import { checkGoals } from './goals_logic.mjs';

// import per l'autenticazione
import passport from 'passport';
import LocalStrategy from 'passport-local';
import session from 'express-session';

// inizializza express
const app = express();
const port = 3001;

// imposta i middleware per il parsing del body e per il logging
app.use(express.json());
app.use(morgan('dev'));

// abilita CORS
const corsOptions = {
  origin: 'http://localhost:5173',
  //origin: 'http://192.168.1.120:5173',
  optionsSuccessStatus: 200,
  credentials: true
};

app.use(cors(corsOptions));

// imposta Passport per l'autenticazione in local strategy
passport.use(new LocalStrategy(async function verify(username, password, cb) {
  const user = await getUser(username, password);
  if (!user)
    return cb(null, false, 'Email o password errati');

  return cb(null, user);
}));

// imposta la serializzazione dell'utente per la sessione
passport.serializeUser(function (user, cb) {
  cb(null, user);
});

// imposta la deserializzazione dell'utente per la sessione
// viene richiamata ad ogni richiesta per vedere se l'utente con id presente in sessione sia ancora presente nel DB
passport.deserializeUser(async function (user, cb) {
  const userResult = await getUserById(user.id);
  if (userResult) {
    cb(null, userResult);
  } else {
    cb(new Error('Utente non trovato'));
  }
});

// middleware per verificare se l'utente è autenticato
const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({ message: 'Non autorizzato' });
}

// impostazione delle sessioni
app.use(session({
  secret: "Press START to play...",
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.authenticate('session'));

/* ROUTES */

// GET /api/goals
app.get('/api/goals', async (req, res) => {
  try {
    const goals = await getGoals();
    res.json(goals);
  } catch {
    res.status(500).json({ message: 'Errore interno del server con gli obiettivi' }).end();
  }
});

// GET /api/goals/:userId
app.get('/api/goals/:userId', isLoggedIn, [
  check('userId').isInt()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array(), message: 'Codice utente errato' });
  }

  // check se l'utente sta cercando i propri obiettivi
  if (parseInt(req.params.userId) !== req.user.id) {
    return res.status(403).json({ message: 'Non autorizzato ad accedere agli obiettivi di un altro utente' });
  }

  try {
    const goals = await getGoalsByUser(req.params.userId);
    res.json(goals);
  } catch {
    res.status(500).json({ message: 'Errore interno del server con gli obiettivi' }).end();
  }
});

// GET /api/stats/:userId
app.get('/api/stats/:userId', isLoggedIn, [
  check('userId').isInt()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array(), message: 'Codice utente errato' });
  }

  // check se l'utente sta cercando le proprie statistiche
  if (parseInt(req.params.userId) !== req.user.id) {
    return res.status(403).json({ message: 'Non autorizzato ad accedere alle statistiche di un altro utente' });
  }

  try {
    const stats = await getStats(req.params.userId);
    res.json(stats);
  } catch {
    res.status(500).json({ message: 'Errore interno del server con gli obiettivi' }).end();
  }
});

// POST /api/game
app.post('/api/game', isLoggedIn, [
  check('difficulty').isInt({ min: 1, max: 4 }),
  check('attemptsHistory').isArray(),
  check('targetNumber').isInt(),
  check('date').isDate({ format: 'YYYY-MM-DD', strictMode: true }),
  check('userId').isInt(),
  check('status').isString()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array(), message: 'Dati non validi' });
  }

  const newGame = req.body;

  // check se l'utente sta caricando una partita per se stesso
  if (parseInt(newGame.userId) !== req.user.id) {
    return res.status(403).json({ message: 'Non autorizzato a caricare un gioco per un altro utente' });
  }

  // salva la partita nel database
  try {
    const id = await addGame(newGame.difficulty, newGame.attemptsHistory, newGame.targetNumber, newGame.date, newGame.userId, newGame.status);
  } catch (e) {
    console.error(`ERROR: ${e.message}`);
    res.status(500).json({ message: 'Impossibile salvare la partita' });
  }

  // controlla gli obiettivi raggiunti
  try {
    const newGoals = await checkGoals(newGame.userId);
    // ritorna i nuovi obiettivi raggiunti
    res.status(201).json(newGoals);
  } catch (e) {
    // se ci sono errori in checkGoals, vengono gestiti tutti qui
    console.error(`ERROR: ${e.message}`);
    res.status(500).json({ message: 'Impossibile controllare gli obiettivi raggiunti' });
  }
});

// POST /api/sessions
app.post('/api/sessions', function (req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    if (err)
      return next(err);
    if (!user) {
      console.log(info);
      const message = { message: info };
      return res.status(401).json(message).end();
    }

    req.login(user, (err) => {
      if (err)
        return next(err);

      // req.user contiene l'utente autenticato, inviamo tutte le informazioni dell'utente
      return res.status(201).json(req.user);
    });
  })(req, res, next);
});

// GET /api/sessions/current
app.get('/api/sessions/current', (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  }
  else
    res.status(401).json({ message: 'Non autenticato' });
});

// DELETE /api/session/current
app.delete('/api/sessions/current', (req, res) => {
  req.logout(() => {
    res.end();
  });
});

// fa partire il server
app.listen(port, () => { console.log(`API server started at http://localhost:${port}`); });
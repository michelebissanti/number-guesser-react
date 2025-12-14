import { db } from '../db.mjs';
import crypto from 'crypto';

// funzione per gestire la richiesta di login di un utente.
// la funzione cerca un utente nel database tramite l'email fornita.
// successivamente, confronta la password fornita con quella salvata nel database
// utilizzando l'hashing con `crypto.scrypt` e un confronto sicuro tramite `crypto.timingSafeEqual`.
// restituisce un oggetto utente in caso di successo, o `false` in caso di fallimento.
export const getUser = (email, password) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM user WHERE email = ?';
    db.get(sql, [email], (err, row) => {
      if (err) {
        reject(err);
      }
      else if (row === undefined) {
        resolve(false);
      }
      else {
        const user = { id: row.id, username: row.email, name: row.name };

        crypto.scrypt(password, row.salt, 32, function (err, hashedPassword) {
          if (err) reject(err);
          if (!crypto.timingSafeEqual(Buffer.from(row.password, 'hex'), hashedPassword))
            resolve(false);
          else
            resolve(user);
        });
      }
    });
  });
};


// funzione per ottenere i dettagli di un utente dal database utilizzando il suo ID.
// la funzione cerca l'utente nel database tramite l'ID fornito.
// restituisce un oggetto utente se l'utente esiste, oppure un oggetto con un messaggio di errore
// in caso l'utente non venga trovato.
// viene richiamata dal deserializeUser per vedere se l'utente con id presente in sessione sia ancora presente nel DB
export const getUserById = (id) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM user WHERE id = ?';
    db.get(sql, [id], (err, row) => {
      if (err) {
        reject(err);
      }
      else if (row === undefined) {
        resolve({ error: 'User not found!' });
      }
      else {
        const user = { id: row.id, username: row.email, name: row.name };
        resolve(user);
      }
    });
  });
};
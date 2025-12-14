import sqlite from 'sqlite3';
import crypto from 'crypto';

// apre il database
export const db = new sqlite.Database('number_guesser.sqlite', (err) => {
  if (err) throw err;
});

// definisco gli utenti per inizializzare la tabella
const users = [
  {
    name: "Michele Bissanti",
    email: "michele.bissanti01@gmail.com",
    password: "michele"
  },
  {
    name: "Luigi De Russis",
    email: "luigi.derussis@polito.it",
    password: "testtest"
  },
  {
    name: "Luca Mannella",
    email: "luca.mannella@polito.it",
    password: "luca.mannella"
  },
  {
    name: "Mario Rossi",
    email: "mario.rossi@email.it",
    password: "mario.rossi"
  },
  {
    name: "Luigi Verdi",
    email: "luigi.verdi@email.it",
    password: "luigi.verdi"
  },
];


// funzione per inizializzare la tabella user
// se la tabella è vuota, inserisce gli utenti
// per ogni utente, genera un salt casuale e crea l'hash della password
function initUsers() {
  const sqlSelect = "SELECT * FROM user";
  db.all(sqlSelect, (err, rows) => {
    if (err)
      console.log(err)
    else if (rows.length === 0) {
      let i = 0;
      const sql = "INSERT INTO user(name, email, password, salt) VALUES(?,?,?,?)";
      for (let user of users) {
        let salt = crypto.randomBytes(16).toString('hex');
        crypto.scrypt(user.password, salt, 32, (err, hashedPassword) => {
          if (err) throw err;
          else
            db.run(sql, [user.name, user.email, hashedPassword, salt], function (err) {
              if (err)
                throw (err);
              else
                console.log("Utente " + user + " inserito");
            });
          i++;
        })
      }
    }
  })
}

initUsers();
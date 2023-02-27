import { Database } from "sqlite3";

const sqlite3 = require("sqlite3").verbose();
const DBSOURCE = "db.sqlite";

const db = new Database(DBSOURCE, (err: Error | null) => {
  if (err) {
    // Cannot open database
    console.error(err.message);
    throw err;
  } else {
    console.log("Connected to the SQLite database.");
    db.run(
      `CREATE TABLE IF NOT EXISTS players (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text NOT NULL
            )`,
      (err: Error) => {
        if (err) {
          // Table already created
        } else {
          // Table just created, creating some rows
        }
      }
    );
    db.run(
      `CREATE TABLE IF NOT EXISTS playerData (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            playerID INTEGER,
            timeStamp INTEGER NOT NULL,
            X INTEGER NOT NULL,
            Y INTEGER NOT NULL,
            Z INTEGER NOT NULL,
            V INTEGER NOT NULL,
            FOREIGN KEY(playerID) REFERENCES players(id)
    )`
    );
  }
});

module.exports = db;

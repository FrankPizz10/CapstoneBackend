// import { Database } from "sqlite3";

// const sqlite3 = require("sqlite3").verbose();
// const DBSOURCE = "db.sqlite";

// const db = new Database(DBSOURCE, (err: Error | null) => {
//   if (err) {
//     // Cannot open database
//     console.error(err.message);
//     throw err;
//   } else {
//     console.log("Connected to the SQLite database.");
//     db.run(
//       `CREATE TABLE IF NOT EXISTS players (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             name text NOT NULL UNIQUE
//             )`,
//       (err: Error) => {
//         if (err) {
//           // Table already created
//         } else {
//           // Table just created, creating some rows
//         }
//       }
//     );
//     db.run(
//       `CREATE TABLE IF NOT EXISTS playerData (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             playerID INTEGER,
//             timeStamp INTEGER NOT NULL UNIQUE,
//             X INTEGER NOT NULL,
//             Y INTEGER NOT NULL,
//             Z INTEGER NOT NULL,
//             V INTEGER NOT NULL,
//             FOREIGN KEY(playerID) REFERENCES players(id)
//     )`
//     );
//     addDefaultPlayers();
//     addDefaultPlayerData();
//   }
// });

// const addDefaultPlayers = () => {
//   const sqlDefaultPlayers = `INSERT INTO players (name) VALUES (?)`;
//   const defaultPlayers = ["Arthur", "Frank", "Nick", "John", "Joe"];
//   for (const player of defaultPlayers) {
//     db.run(sqlDefaultPlayers, [player], (err: Error) => {
//       if (err) {
//         console.log(err.message);
//       } else {
//         console.log(`Added ${player} to the database`);
//       }
//     });
//   }
// };

// const addDefaultPlayerData = () => {
//   const sqlDefaultPlayerData = `INSERT INTO playerData (playerID, timeStamp, X, Y, Z, V) VALUES (?, ?, ?, ?, ?, ?)`;
//   const defaultPlayerData = [
//     [1, 1, 1, 1, 1, 1],
//     [2, 2, 2, 2, 2, 2],
//     [3, 3, 3, 3, 3, 3],
//     [4, 4, 4, 4, 4, 4],
//     [5, 5, 5, 5, 5, 5],
//   ];
//   for (const data of defaultPlayerData) {
//     db.run(sqlDefaultPlayerData, data, (err: Error) => {
//       if (err) {
//         console.log(err.message);
//       } else {
//         console.log(`Added ${data} to the database`);
//       }
//     });
//   }
//   db.run(sqlDefaultPlayerData, [1, 10, 1, 1, 1, 1], (err: Error) => {
//     if (err) {
//       console.log(err.message);
//     } else {
//       console.log(`Added ${[1, 10, 1, 1, 1, 1]} to the database`);
//     }
//   });
// };

// module.exports = db;

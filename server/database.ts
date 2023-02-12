const sqlite3 = require('sqlite3').verbose()
const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err: Error) => {
    if (err) {
        // Cannot open database
        console.error(err.message)
        throw err
    } else {
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE IF NOT EXISTS players (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text NOT NULL
            )`,
            (err: Error) => {
                if (err) {
                    // Table already created
                } else {
                    // Table just created, creating some rows
                }
            });
    }
});

module.exports = db
import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = 8000;

const db = require("./database.js");
const cors = require('cors');
app.use(cors());

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

// Fix Types

// Insert here other API endpoints
app.get("/api/players", (req, res, next) => {
    const sql = "select * from players"
    db.all(sql, (err: Error, rows: any[]) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        })
    });
});

app.get("/api/players/:id", (req, res, next) => {
    const sql = "select * from players where id = ?"
    const params = [req.params.id]
    db.get(sql, params, (err: Error, row: any[]) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": row
        })
    });
});

// app.post("/api/players/", (req, res, next) => {
//     var errors=[]
//     if (!req.body.name){
//         errors.push("No name specified");
//     }
//     if (errors.length){
//         res.status(400).json({"error":errors.join(",")});
//         return;
//     }
//     var data = {
//         name: req.body.name
//     }
//     var sql ='INSERT INTO players (name) VALUES (?)'
//     var params =[data.name]
//     db.run(sql, params, function (err, result) {
//         if (err){
//             res.status(400).json({"error": err.message})
//             return;
//         }
//         res.json({
//             "message": "success",
//             "data": data,
//             "id" : this.lastID
//         })
//     });
// })

// app.patch("/api/players/:id", (req, res, next) => {
//     var data = {
//         name: req.body.name
//     }
//     db.run(
//         `UPDATE players set
//            name = COALESCE(?,name),
//            WHERE id = ?`,
//         [data.name, req.params.id],
//         function (err, result) {
//             if (err){
//                 res.status(400).json({"error": res.message})
//                 return;
//             }
//             res.json({
//                 message: "success",
//                 data: data,
//                 changes: this.changes
//             })
//     });
// })
// // Default response for any other request
// app.use(function(req, res){
//     res.status(404);
// });
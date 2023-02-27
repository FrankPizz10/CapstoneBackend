import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = 8000;

const db = require("./database.js");
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

let playerID = 1;

const updateID = (id: number) => {
  playerID = id;
};

// Fix Types

// Insert here other API endpoints
app.get("/api/players", (req, res, next) => {
  const sql = "select * from players";
  db.all(sql, (err: Error, rows: any[]) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

app.post("/updateID", (req, res, next) => {
  playerID = req.body.id;
  updateID(playerID);
  res.json({
    message: "success",
    data: playerID,
  });
});

app.get("/api/players/:id", (req, res, next) => {
  const sql = "select * from players where id = ?";
  const params = [req.params.id];
  db.get(sql, params, (err: Error, row: any[]) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: row,
    });
  });
});

app.post("/api/players/", (req, res, next) => {
  const errors: String[] = [];
  if (!req.body.name) {
    errors.push("No name specified");
  }
  if (errors.length) {
    res.status(400).json({ error: errors.join(",") });
    return;
  }
  const data = {
    name: req.body.name,
  };
  const sql = "INSERT INTO players (name) VALUES (?)";
  const params = [data.name];
  db.run(sql, params, function (err: Error, result: any) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: data,
      id: db.lastID,
    });
  });
});

type PlayerData = {
  playerID: number;
  timeStamp: number;
  X: number;
  Y: number;
  Z: number;
  V: number;
};

app.post("/api/playerData/", (req, res, next) => {
  const errors: String[] = [];
  if (!req.body.ts) {
    errors.push("No name specified");
  }
  if (!req.body.xyzv) {
    errors.push("Malformed Body");
  }
  if (errors.length) {
    res.status(400).json({ error: errors.join(",") });
    return;
  }
  if (req.body.bball === "NULL") {
    return;
  }
  const realData = req.body.xyzv.find(
    (data: number[]) => data[3] === req.body.bball
  );
  const data: PlayerData = {
    playerID: playerID,
    timeStamp: req.body.ts,
    X: realData[0],
    Y: realData[1],
    Z: realData[2],
    V: realData[3],
  };
  const sql =
    "INSERT INTO playerData (playerID, timeStamp, X, Y, Z, V) VALUES (?,?,?,?,?,?)";
  const params = [
    data.playerID,
    data.timeStamp,
    data.X,
    data.Y,
    data.Z,
    data.V,
  ];
  db.run(sql, params, function (err: Error, result: any) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: data,
      id: db.lastID,
    });
  });
});

app.get("/api/playerData/:id", (req, res, next) => {
  const sql = "select * from playerData where playerID = ?";
  const params = [req.params.id];
  db.all(sql, params, (err: Error, row: any[]) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: row,
    });
  });
});

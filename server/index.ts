import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { PrismaClient, Prisma } from "@prisma/client";
import { seedData } from "./SeedDatabase";

dotenv.config();

const app: Express = express();
const port = 8000;

const cors = require("cors");
const bodyParser = require("body-parser");

const prisma = new PrismaClient();

seedData().then(() => {
    console.log("Seeded");
});

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

app.get("/api/players", async (req, res, next) => {
    const players = await prisma.player.findMany();
    res.json({
        message: "success",
        data: players,
    });
});

app.get("/api/players/:id", async (req, res, next) => {
    const player = await prisma.player.findUnique({
        where: {
            id: Number(req.params.id),
        },
    });
    console.log(player);
    res.json({
        message: "success",
        data: player,
    });
});

app.post("/api/players/", async (req, res, next) => {
    const errors: String[] = [];

    if (!req.body.name) {
        errors.push("No name specified");
    }
    if (errors.length) {
        res.status(400).json({ error: errors.join(",") });
        return;
    }
    try {
        const player = await prisma.player.create({
            data: {
                name: req.body.name,
            },
        });
        res.json({
            message: "success",
            data: player,
        });
    }
    catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === 'P2002') {
                res.status(400).json({ error: "Name already exists" });
            }
        }
    }
});

app.post("/api/playerData/", async (req, res, next) => {
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
        res.status(400).json({ error: "No bball" });
        return;
    }
    const spacialData = req.body.xyzv.find(
        (data: number[]) => data[3] === req.body.bball
    );
    if (spacialData) {
        const playerData = await prisma.playerdata.create({
            data: {
                playerId: playerID,
                timeStamp: new Date(req.body.ts),
                X: spacialData[0],
                Y: spacialData[1],
                Z: spacialData[2],
                V: spacialData[3],
            },
        });
        res.json({
            message: "success",
            data: playerData,
        });
    }
    else {
        res.status(400).json({ error: "No data for bball" });
    }
});

app.get("/api/playerData/:id", async (req, res, next) => {
    const playerData = await prisma.playerdata.findMany({
        where: {
            playerId: Number(req.params.id),
        },
    });
    res.json({
        message: "success",
        data: playerData,
    });
});

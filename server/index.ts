import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { PrismaClient, Prisma } from "@prisma/client";
import { seedData } from "./SeedDatabase";
import { getAdvancedStats } from "./DatabaseHelpers";

dotenv.config();

const app: Express = express();

const cors = require("cors");
const bodyParser = require("body-parser");

const prisma = new PrismaClient();

const seed = async () => {
  await seedData();
  console.log("Seeded");
};

seed();

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

app.listen(process.env.PORT, () => {
  console.log(
    `⚡️[server]: Server is running at https://capstonebackend.herokuapp.com/:${process.env.PORT}`
  );
});

let playerID = 1;

const updateID = (id: number) => {
  playerID = id;
};

app.get("/api/players", async (req, res, next) => {
  const players = await getAdvancedStats();
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

// Add Player
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
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
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
  const playerData = await prisma.playerdata.create({
    data: {
      playerId: playerID,
      timeStamp: new Date(req.body.ts),
      X: req.body.xyzv[0],
      Y: req.body.xyzv[1],
      Z: req.body.xyzv[2],
      V: req.body.xyzv[3],
    },
  });
  res.json({
    message: "success",
    data: playerData,
  });
  console.log(playerData);
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

app.patch("/api/currentPlayerID/:id", async (req, res, next) => {
  // if the request conntains an id parameter, update the id
  if (req.params.id) {
    updateID(Number(req.params.id));
    res.json({
      message: "success",
      data: playerID,
    });
  } else {
    res.json({
      message: "Must specify an id",
    });
  }
});

app.get("/api/currentPlayerID", async (req, res, next) => {
  res.json({
    message: "success",
    data: playerID,
  });
});

app.post("/api/uploadVideo", async (req, res, next) => {
  if (!req.body.video) {
    res.status(400).json({ error: "No video specified" });
    return;
  }
  if (!req.body.ts) {
    res.status(400).json({ error: "No timestamp specified" });
    return;
  }
  const video = await prisma.playerVideos.create({
    data: {
      playerId: playerID,
      video: req.body.video,
      timeStamp: new Date(req.body.ts),
    },
  });
  res.json({
    message: "success",
    data: video,
  });
});

app.get("/api/players/:id/videos", async (req, res, next) => {
  const videos = await prisma.playerVideos.findMany({
    where: {
      playerId: Number(req.params.id),
    },
  });
  res.json({
    message: "success",
    data: videos,
  });
});

app.post("/api/imageframes", async (req, res, next) => {
  if (!req.body.ts) {
    res.status(400).json({ error: "No timestamp specified" });
    return;
  }
  if (!req.body.pvn) {
    res.status(400).json({ error: "No image specified" });
    return;
  }
  if (!req.body.X || !req.body.Y) {
    res.status(400).json({ error: "No coordinates specified" });
    return;
  }
  const imageFrame = await prisma.imageFrames.create({
    data: {
      playerVideoName: req.body.pvn,
      timeStamp: new Date(req.body.ts),
      X: req.body.X,
      Y: req.body.Y,
    },
  });
  res.json({
    message: "success",
    data: imageFrame,
  });
});

app.get("/api/imageframes/:pvn", async (req, res, next) => {
  const imageFrames = await prisma.imageFrames.findMany({
    where: {
      playerVideoName: req.params.pvn,
    },
  });
  res.json({
    message: "success",
    data: imageFrames,
  });
});

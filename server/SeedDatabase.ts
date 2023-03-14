import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function seedData() {
  await addPlayerData();
  await addExtraData();
}

async function addPlayerData() {
  const playerData = {
    Frank: [new Date(10), 1, 1, 1, 1],
    Arthur: [new Date(20000), 2, 2, 2, 2],
    Nick: [new Date(30000000), 3, 3, 3, 3],
    John: [new Date(4000000000), 4, 4, 4, 4],
    Joe: [new Date(500000000000), 5, 5, 5, 5],
  };
  for (const name in playerData) {
    try {
      const player = await prisma.player.create({
        data: {
          name,
        },
      });
      await prisma.playerdata.create({
        data: {
          playerId: player.id,
          timeStamp: playerData[
            name as keyof typeof playerData
          ][0] as unknown as Date,
          X: playerData[
            name as keyof typeof playerData
          ][1] as unknown as number,
          Y: playerData[
            name as keyof typeof playerData
          ][2] as unknown as number,
          Z: playerData[
            name as keyof typeof playerData
          ][3] as unknown as number,
          V: playerData[
            name as keyof typeof playerData
          ][4] as unknown as number,
        },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === "P2002") {
          console.log(
            "There is a unique constraint violation, a new user cannot be created with this timestamp"
          );
        }
      }
    }
  }
}

async function addExtraData() {
  const player = await prisma.player.findUnique({
    where: {
      name: "Frank",
    },
  });
  if (player) {
    try {
      const playerData = await prisma.playerdata.create({
        data: {
          playerId: player.id,
          timeStamp: new Date(6000000000000),
          X: 10,
          Y: 10,
          Z: 10,
          V: 100,
        },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === "P2002") {
          console.log(
            "There is a unique constraint violation, a new user cannot be created with this timestamp"
          );
        }
      }
    }
  }
}

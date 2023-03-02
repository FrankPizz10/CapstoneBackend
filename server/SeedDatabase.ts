import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function seedData() {
  await addPlayerData();
  await addExtraData();
}

async function addPlayerData() {
  const playerData = {
    Frank: [new Date(1).toISOString(), 1, 1, 1, 1],
    Arthur: [new Date(2).toISOString(), 2, 2, 2, 2],
    Nick: [new Date(3).toISOString(), 3, 3, 3, 3],
    John: [new Date(4).toISOString(), 4, 4, 4, 4],
    Joe: [new Date(5).toISOString(), 5, 5, 5, 5],
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
      continue;
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
    console.log("Here");
    const playerData = await prisma.playerdata.create({
      data: {
        playerId: player.id,
        timeStamp: new Date(6).toISOString(),
        X: 10,
        Y: 10,
        Z: 10,
        V: 100,
      },
    });
  }
}

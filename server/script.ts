import { Playerdata, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function seed() {
    await addPlayerData();
}

async function addPlayerData() {
    const playerData = {
        "Frank": [1, 1, 1, 1, 1],
        "Arthur": [2, 2, 2, 2, 2],
        "Nick": [3, 3, 3, 3, 3],
        "John": [4, 4, 4, 4, 4],
        "Joe": [5, 5, 5, 5, 5],
    }
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
                    timeStamp: playerData[name as keyof typeof playerData][0],
                    X: playerData[name as keyof typeof playerData][1],
                    Y: playerData[name as keyof typeof playerData][2],
                    Z: playerData[name as keyof typeof playerData][3],
                    V: playerData[name as keyof typeof playerData][4],
                }
            });
        } catch (e) {
            continue;
        }
    }
}
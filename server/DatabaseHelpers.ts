import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

type AdvancedStats = {
    maxExitVelo: number;
    avgExitVelo: number;
};

type PlayerStats = {
    id: number;
    name: string;
    stats: AdvancedStats;
}

// This function should return a list of PlayerStats where average exit velo is the average of each of the playerdata v and max exit velo is the max of each of the playerdata v
export const getAdvancedStats = async (): Promise<PlayerStats[]> => {
    const playerStats: PlayerStats[] = [];
    const players = await prisma.player.findMany();
    const playerData = await prisma.playerdata.findMany();
    for (let i = 0; i < players.length; i++) {
        let sum = 0;
        let max = 0;
        let length = 0;
        for (let j = 0; j < playerData.length; j++) {
            if (players[i].id === playerData[j].playerId) {
                sum += playerData[j].V;
                length++;
                if (playerData[j].V > max) {
                    max = playerData[j].V;
                }
            }
        }
        playerStats.push({
            id: players[i].id,
            name: players[i].name,
            stats: {
                maxExitVelo: max,
                avgExitVelo: sum / length,
            },
        });
    }
    return playerStats;
};
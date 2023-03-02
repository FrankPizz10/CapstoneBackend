import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    await addDefaultPlayers();
    await addDefaultPlayerData();
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })

async function addDefaultPlayers() {
    const defaultPlayers = ['Frank', 'Arthur', 'Nick', 'John', 'Joe']
    let id = 1;
    for (const player of defaultPlayers) {
        let playerExists;
        try {
            playerExists = await prisma.player.findFirst({
                where: {
                    id: id,
                    name: player,
                },
            });
        }
        catch (e) {
            continue;
        };
        if (!playerExists) {
            const createPlayer = await prisma.player.create({
                data: {
                    name: player,
                },
            });
            console.log(createPlayer);
        }
        else {
            console.log('Player already exists');
        }
        id++;
    }
}

async function addDefaultPlayerData() {
    const defaultPlayerData = [
        [1, 1, 1, 1, 1, 1],
        [2, 2, 2, 2, 2, 2],
        [3, 3, 3, 3, 3, 3],
        [4, 4, 4, 4, 4, 4],
        [5, 5, 5, 5, 5, 5],
        [1, 10, 10, 10, 10, 10],
    ]
    for (const data of defaultPlayerData) {
        let playerDataExists;
        try {
            playerDataExists = await prisma.playerdata.findFirst({
                where: {
                    playerId: data[0],
                    timeStamp: data[1],
                },
            });
        }
        catch (e) {
            continue;
        };
        if (!playerDataExists) {
            const createPlayerData = await prisma.playerdata.create({
                data: {
                    playerId: data[0],
                    timeStamp: data[1],
                    X: data[2],
                    Y: data[3],
                    Z: data[4],
                    V: data[5],
                },
            });
            console.log(createPlayerData)
        }
        else {
            console.log('Player data already exists');
        }
    }
}

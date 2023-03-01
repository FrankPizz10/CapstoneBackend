import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const deleteAll = await prisma.player.deleteMany({});
    const deleteAllData = await prisma.playerdata.deleteMany({});
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
    for (const player of defaultPlayers) {
        const createPlayer = await prisma.player.create({
            data: {
                name: player,
            },
        })
        console.log(createPlayer)
    }
}

async function addDefaultPlayerData() {
    const ids = await prisma.player.findMany({
        select: {
            id: true,
        },
    })
    if (ids.length < 5) {
        throw new Error('Not enough players in database')
    }
    const defaultPlayerData = [
        [ids[0].id, 1, 1, 1, 1, 1],
        [ids[1].id, 2, 2, 2, 2, 2],
        [ids[2].id, 3, 3, 3, 3, 3],
        [ids[3].id, 4, 4, 4, 4, 4],
        [ids[4].id, 5, 5, 5, 5, 5],
    ]
    for (const data of defaultPlayerData) {
        const createPlayerData = await prisma.playerdata.create({
            data: {
                playerId: data[0],
                timeStamp: data[1],
                X: data[2],
                Y: data[3],
                Z: data[4],
                V: data[5],
            },
        })
        console.log(createPlayerData)
    }
    const playerID = await prisma.player.findFirst({
        select: {
            id: true,
        },
    })
    const createPlayerData = await prisma.playerdata.create({
        data: {
            playerId: playerID!.id,
            timeStamp: 10,
            X: 10,
            Y: 10,
            Z: 10,
            V: 10,
        },
    })
    console.log(createPlayerData)
}

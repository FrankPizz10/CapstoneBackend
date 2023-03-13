import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

prisma.playerdata
  .deleteMany({})
  .then(() => {
    console.log("Deleted");
  })
  .catch((e) => {
    console.log(e);
  });

prisma.player
  .deleteMany({})
  .then(() => {
    console.log("Deleted");
  })
  .catch((e) => {
    console.log(e);
  });

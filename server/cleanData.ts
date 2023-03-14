import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const deleteData = async () => {
  await prisma.playerdata.deleteMany({});
  await prisma.player.deleteMany({});
  console.log("Delete Data");
};

deleteData(); // Call the function

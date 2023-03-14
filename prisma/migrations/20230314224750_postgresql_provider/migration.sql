-- CreateTable
CREATE TABLE "Player" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Playerdata" (
    "id" SERIAL NOT NULL,
    "playerId" INTEGER NOT NULL,
    "timeStamp" TIMESTAMP(3) NOT NULL,
    "X" DOUBLE PRECISION NOT NULL,
    "Y" DOUBLE PRECISION NOT NULL,
    "Z" DOUBLE PRECISION NOT NULL,
    "V" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Playerdata_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Player_name_key" ON "Player"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Playerdata_timeStamp_key" ON "Playerdata"("timeStamp");

-- AddForeignKey
ALTER TABLE "Playerdata" ADD CONSTRAINT "Playerdata_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE "PlayerVideos" (
    "id" SERIAL NOT NULL,
    "playerId" INTEGER NOT NULL,
    "timeStamp" TIMESTAMP(3) NOT NULL,
    "video" TEXT NOT NULL,

    CONSTRAINT "PlayerVideos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PlayerVideos_timeStamp_key" ON "PlayerVideos"("timeStamp");

-- AddForeignKey
ALTER TABLE "PlayerVideos" ADD CONSTRAINT "PlayerVideos_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

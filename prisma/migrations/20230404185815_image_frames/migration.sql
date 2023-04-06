/*
  Warnings:

  - A unique constraint covering the columns `[video]` on the table `PlayerVideos` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "ImagesFrames" (
    "id" SERIAL NOT NULL,
    "playerVideoName" TEXT NOT NULL,
    "timeStamp" TIMESTAMP(3) NOT NULL,
    "X" INTEGER NOT NULL,
    "Y" INTEGER NOT NULL,

    CONSTRAINT "ImagesFrames_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ImagesFrames_timeStamp_key" ON "ImagesFrames"("timeStamp");

-- CreateIndex
CREATE UNIQUE INDEX "PlayerVideos_video_key" ON "PlayerVideos"("video");

-- AddForeignKey
ALTER TABLE "ImagesFrames" ADD CONSTRAINT "ImagesFrames_playerVideoName_fkey" FOREIGN KEY ("playerVideoName") REFERENCES "PlayerVideos"("video") ON DELETE RESTRICT ON UPDATE CASCADE;

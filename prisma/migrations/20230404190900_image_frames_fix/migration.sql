/*
  Warnings:

  - You are about to drop the `ImagesFrames` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ImagesFrames" DROP CONSTRAINT "ImagesFrames_playerVideoName_fkey";

-- DropTable
DROP TABLE "ImagesFrames";

-- CreateTable
CREATE TABLE "ImageFrames" (
    "id" SERIAL NOT NULL,
    "playerVideoName" TEXT NOT NULL,
    "timeStamp" TIMESTAMP(3) NOT NULL,
    "X" INTEGER NOT NULL,
    "Y" INTEGER NOT NULL,

    CONSTRAINT "ImageFrames_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ImageFrames_timeStamp_key" ON "ImageFrames"("timeStamp");

-- AddForeignKey
ALTER TABLE "ImageFrames" ADD CONSTRAINT "ImageFrames_playerVideoName_fkey" FOREIGN KEY ("playerVideoName") REFERENCES "PlayerVideos"("video") ON DELETE RESTRICT ON UPDATE CASCADE;

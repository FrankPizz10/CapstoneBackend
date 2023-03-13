/*
  Warnings:

  - A unique constraint covering the columns `[timeStamp]` on the table `Playerdata` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Playerdata_timeStamp_key" ON "Playerdata"("timeStamp");

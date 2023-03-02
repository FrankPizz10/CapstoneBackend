/*
  Warnings:

  - You are about to alter the column `timeStamp` on the `Playerdata` table. The data in that column could be lost. The data in that column will be cast from `Int` to `DateTime`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Playerdata" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "playerId" INTEGER NOT NULL,
    "timeStamp" DATETIME NOT NULL,
    "X" REAL NOT NULL,
    "Y" REAL NOT NULL,
    "Z" REAL NOT NULL,
    "V" REAL NOT NULL,
    CONSTRAINT "Playerdata_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Playerdata" ("V", "X", "Y", "Z", "id", "playerId", "timeStamp") SELECT "V", "X", "Y", "Z", "id", "playerId", "timeStamp" FROM "Playerdata";
DROP TABLE "Playerdata";
ALTER TABLE "new_Playerdata" RENAME TO "Playerdata";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

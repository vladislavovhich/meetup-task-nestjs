/*
  Warnings:

  - You are about to drop the column `assignedAt` on the `MeetupSubcriber` table. All the data in the column will be lost.
  - You are about to drop the column `assignedBy` on the `MeetupSubcriber` table. All the data in the column will be lost.
  - You are about to drop the column `assignedAt` on the `MeetupTag` table. All the data in the column will be lost.
  - You are about to drop the column `assignedBy` on the `MeetupTag` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "MeetupSubcriber" DROP COLUMN "assignedAt",
DROP COLUMN "assignedBy";

-- AlterTable
ALTER TABLE "MeetupTag" DROP COLUMN "assignedAt",
DROP COLUMN "assignedBy";

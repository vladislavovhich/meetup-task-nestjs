/*
  Warnings:

  - The primary key for the `MeetupSubcriber` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `MeetupSubcriber` table. All the data in the column will be lost.
  - Added the required column `assignedBy` to the `MeetupSubcriber` table without a default value. This is not possible if the table is not empty.
  - Made the column `userId` on table `MeetupSubcriber` required. This step will fail if there are existing NULL values in that column.
  - Made the column `meetupId` on table `MeetupSubcriber` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `Tag` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "MeetupSubcriber" DROP CONSTRAINT "MeetupSubcriber_meetupId_fkey";

-- DropForeignKey
ALTER TABLE "MeetupSubcriber" DROP CONSTRAINT "MeetupSubcriber_userId_fkey";

-- DropForeignKey
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_userId_fkey";

-- AlterTable
ALTER TABLE "MeetupSubcriber" DROP CONSTRAINT "MeetupSubcriber_pkey",
DROP COLUMN "id",
ADD COLUMN     "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "assignedBy" TEXT NOT NULL,
ALTER COLUMN "userId" SET NOT NULL,
ALTER COLUMN "meetupId" SET NOT NULL,
ADD CONSTRAINT "MeetupSubcriber_pkey" PRIMARY KEY ("userId", "meetupId");

-- AlterTable
ALTER TABLE "Tag" ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "MeetupSubcriber" ADD CONSTRAINT "MeetupSubcriber_meetupId_fkey" FOREIGN KEY ("meetupId") REFERENCES "Meetup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MeetupSubcriber" ADD CONSTRAINT "MeetupSubcriber_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `authorRate` on the `Reviews` table. All the data in the column will be lost.
  - You are about to drop the column `avarageRating` on the `Reviews` table. All the data in the column will be lost.
  - You are about to drop the column `published` on the `Reviews` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Reviews` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[TitleOfWork,authorId]` on the table `Reviews` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `AuthRating` to the `Reviews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ReviewName` to the `Reviews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ReviewText` to the `Reviews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `TitleOfWork` to the `Reviews` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Reviews_title_authorId_key";

-- AlterTable
ALTER TABLE "Reviews" DROP COLUMN "authorRate",
DROP COLUMN "avarageRating",
DROP COLUMN "published",
DROP COLUMN "title",
ADD COLUMN     "AuthRating" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "ReviewName" TEXT NOT NULL,
ADD COLUMN     "ReviewText" TEXT NOT NULL,
ADD COLUMN     "TitleOfWork" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Reviews_TitleOfWork_authorId_key" ON "Reviews"("TitleOfWork", "authorId");

/*
  Warnings:

  - A unique constraint covering the columns `[reviewId]` on the table `ReviewRating` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "ReviewRating" ALTER COLUMN "userRate" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ReviewRating_reviewId_key" ON "ReviewRating"("reviewId");

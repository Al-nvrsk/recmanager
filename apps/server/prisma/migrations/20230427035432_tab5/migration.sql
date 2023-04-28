/*
  Warnings:

  - You are about to drop the column `liked` on the `ReviewRating` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ReviewRating" DROP COLUMN "liked",
ADD COLUMN     "likeStatus" TEXT;

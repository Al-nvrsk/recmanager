-- DropForeignKey
ALTER TABLE "Comments" DROP CONSTRAINT "Comments_reviewId_fkey";

-- DropForeignKey
ALTER TABLE "Comments" DROP CONSTRAINT "Comments_userId_fkey";

-- DropForeignKey
ALTER TABLE "ReviewRating" DROP CONSTRAINT "ReviewRating_reviewId_fkey";

-- DropForeignKey
ALTER TABLE "Tags" DROP CONSTRAINT "Tags_postId_fkey";

-- DropForeignKey
ALTER TABLE "UserTheme" DROP CONSTRAINT "UserTheme_ownerId_fkey";

-- AddForeignKey
ALTER TABLE "UserTheme" ADD CONSTRAINT "UserTheme_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tags" ADD CONSTRAINT "Tags_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Reviews"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "Reviews"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReviewRating" ADD CONSTRAINT "ReviewRating_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "Reviews"("id") ON DELETE CASCADE ON UPDATE CASCADE;

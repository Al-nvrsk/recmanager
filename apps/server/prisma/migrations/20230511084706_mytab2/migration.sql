-- DropForeignKey
ALTER TABLE `ReviewRating` DROP FOREIGN KEY `ReviewRating_authorId_fkey`;

-- AddForeignKey
ALTER TABLE `ReviewRating` ADD CONSTRAINT `ReviewRating_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

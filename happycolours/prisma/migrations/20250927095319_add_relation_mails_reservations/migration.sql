/*
  Warnings:

  - Added the required column `reservation_id` to the `mails` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `mails` ADD COLUMN `reservation_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `mails` ADD CONSTRAINT `mails_reservation_id_fkey` FOREIGN KEY (`reservation_id`) REFERENCES `reservations`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

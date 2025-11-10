/*
  Warnings:

  - You are about to drop the column `salle_id` on the `reservations` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `reservations` DROP FOREIGN KEY `reservations_salle_id_fkey`;

-- DropIndex
DROP INDEX `reservations_salle_id_idx` ON `reservations`;

-- AlterTable
ALTER TABLE `reservations` DROP COLUMN `salle_id`;

-- CreateTable
CREATE TABLE `ReservationSalle` (
    `reservation_id` INTEGER NOT NULL,
    `salle_id` INTEGER NOT NULL,

    INDEX `ReservationSalle_salle_id_idx`(`salle_id`),
    PRIMARY KEY (`reservation_id`, `salle_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ReservationSalle` ADD CONSTRAINT `ReservationSalle_reservation_id_fkey` FOREIGN KEY (`reservation_id`) REFERENCES `reservations`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReservationSalle` ADD CONSTRAINT `ReservationSalle_salle_id_fkey` FOREIGN KEY (`salle_id`) REFERENCES `salles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

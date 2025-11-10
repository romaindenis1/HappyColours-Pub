-- AlterTable
ALTER TABLE `reservations` ADD COLUMN `confirmed` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `prix` DECIMAL(10, 2) NOT NULL DEFAULT 0.0;

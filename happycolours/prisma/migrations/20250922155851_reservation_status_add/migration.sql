/*
  Warnings:

  - You are about to drop the column `confirmed` on the `reservations` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `reservations` DROP COLUMN `confirmed`,
    ADD COLUMN `status` VARCHAR(191) NOT NULL DEFAULT 'Pending';

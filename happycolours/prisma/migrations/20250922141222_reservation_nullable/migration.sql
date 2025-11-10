/*
  Warnings:

  - You are about to drop the column `date_` on the `reservations` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `reservations` DROP COLUMN `date_`,
    ADD COLUMN `date` DATE NULL,
    MODIFY `debut` TIME NULL;

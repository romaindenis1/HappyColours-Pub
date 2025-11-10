/*
  Warnings:

  - Added the required column `nbrPerson` to the `reservations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `reservations` ADD COLUMN `nbrPerson` INTEGER NOT NULL,
    MODIFY `date_` DATE NULL,
    MODIFY `debut` TIME(0) NULL;

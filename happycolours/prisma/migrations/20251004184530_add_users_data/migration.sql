/*
  Warnings:

  - Added the required column `nom` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prenom` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telephone` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `users` ADD COLUMN `nom` VARCHAR(100) NOT NULL,
    ADD COLUMN `prenom` VARCHAR(100) NOT NULL,
    ADD COLUMN `telephone` VARCHAR(20) NOT NULL;

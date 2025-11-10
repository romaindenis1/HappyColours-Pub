/*
  Warnings:

  - You are about to alter the column `salt` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(50)` to `VarChar(32)`.

*/
-- AlterTable
ALTER TABLE `users` MODIFY `password` VARCHAR(255) NOT NULL,
    MODIFY `salt` VARCHAR(32) NOT NULL;

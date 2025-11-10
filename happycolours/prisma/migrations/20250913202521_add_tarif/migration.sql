/*
  Warnings:

  - The primary key for the `appartenir` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `salle_id` on the `appartenir` table. The data in that column could be lost. The data in that column will be cast from `UnsignedInt` to `Int`.
  - You are about to alter the column `jourFerme_id` on the `appartenir` table. The data in that column could be lost. The data in that column will be cast from `UnsignedInt` to `Int`.
  - The primary key for the `etre` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `salle_id` on the `etre` table. The data in that column could be lost. The data in that column will be cast from `UnsignedInt` to `Int`.
  - You are about to alter the column `formule_id` on the `etre` table. The data in that column could be lost. The data in that column will be cast from `UnsignedInt` to `Int`.
  - The primary key for the `formules` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `prix` on the `formules` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `formules` table. The data in that column could be lost. The data in that column will be cast from `UnsignedInt` to `Int`.
  - You are about to alter the column `image` on the `formules` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(100)`.
  - The primary key for the `joursFermes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `joursFermes` table. The data in that column could be lost. The data in that column will be cast from `UnsignedInt` to `Int`.
  - The primary key for the `lieux` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `lieux` table. The data in that column could be lost. The data in that column will be cast from `UnsignedInt` to `Int`.
  - You are about to alter the column `adresse` on the `lieux` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `VarChar(50)`.
  - You are about to alter the column `NPA` on the `lieux` table. The data in that column could be lost. The data in that column will be cast from `SmallInt` to `TinyInt`.
  - The primary key for the `reservations` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `reservations` table. The data in that column could be lost. The data in that column will be cast from `UnsignedInt` to `Int`.
  - You are about to alter the column `formule_id` on the `reservations` table. The data in that column could be lost. The data in that column will be cast from `UnsignedInt` to `Int`.
  - You are about to alter the column `user_id` on the `reservations` table. The data in that column could be lost. The data in that column will be cast from `UnsignedInt` to `Int`.
  - You are about to alter the column `nbrPerson` on the `reservations` table. The data in that column could be lost. The data in that column will be cast from `Int` to `TinyInt`.
  - The primary key for the `salles` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `salles` table. The data in that column could be lost. The data in that column will be cast from `UnsignedInt` to `Int`.
  - You are about to alter the column `lieu_id` on the `salles` table. The data in that column could be lost. The data in that column will be cast from `UnsignedInt` to `Int`.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `users` table. The data in that column could be lost. The data in that column will be cast from `UnsignedInt` to `Int`.

*/
-- DropForeignKey
ALTER TABLE `appartenir` DROP FOREIGN KEY `appartenir_ibfk_1`;

-- DropForeignKey
ALTER TABLE `appartenir` DROP FOREIGN KEY `appartenir_ibfk_2`;

-- DropForeignKey
ALTER TABLE `etre` DROP FOREIGN KEY `etre_ibfk_1`;

-- DropForeignKey
ALTER TABLE `etre` DROP FOREIGN KEY `etre_ibfk_2`;

-- DropForeignKey
ALTER TABLE `reservations` DROP FOREIGN KEY `reservations_ibfk_1`;

-- DropForeignKey
ALTER TABLE `reservations` DROP FOREIGN KEY `reservations_ibfk_2`;

-- DropForeignKey
ALTER TABLE `salles` DROP FOREIGN KEY `salles_ibfk_1`;

-- AlterTable
ALTER TABLE `appartenir` DROP PRIMARY KEY,
    MODIFY `salle_id` INTEGER NOT NULL,
    MODIFY `jourFerme_id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`salle_id`, `jourFerme_id`);

-- AlterTable
ALTER TABLE `etre` DROP PRIMARY KEY,
    MODIFY `salle_id` INTEGER NOT NULL,
    MODIFY `formule_id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`salle_id`, `formule_id`);

-- AlterTable
ALTER TABLE `formules` DROP PRIMARY KEY,
    DROP COLUMN `prix`,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `title` VARCHAR(50) NULL,
    MODIFY `description` VARCHAR(150) NULL,
    MODIFY `image` VARCHAR(100) NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `joursFermes` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `lieux` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `nom` VARCHAR(50) NULL,
    MODIFY `adresse` VARCHAR(50) NULL,
    MODIFY `NPA` TINYINT NULL,
    MODIFY `localite` VARCHAR(50) NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `reservations` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `formule_id` INTEGER NOT NULL,
    MODIFY `user_id` INTEGER NOT NULL,
    MODIFY `nbrPerson` TINYINT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `salles` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `nom` VARCHAR(50) NULL,
    MODIFY `capacite` TINYINT NULL,
    MODIFY `lieu_id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `users` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `mail` VARCHAR(320) NULL,
    MODIFY `password` VARCHAR(100) NULL,
    MODIFY `salt` VARCHAR(50) NULL,
    ADD PRIMARY KEY (`id`);

-- CreateTable
CREATE TABLE `tranche_prix` (
    `id` INTEGER NOT NULL,
    `prix` DECIMAL(10, 2) NULL,
    `minPersonnes` TINYINT NULL,
    `maxPersonnes` TINYINT NULL,
    `id_1` INTEGER NOT NULL,

    INDEX `tranche_prix_id_1_idx`(`id_1`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `salles` ADD CONSTRAINT `salles_lieu_id_fkey` FOREIGN KEY (`lieu_id`) REFERENCES `lieux`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tranche_prix` ADD CONSTRAINT `tranche_prix_id_1_fkey` FOREIGN KEY (`id_1`) REFERENCES `formules`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reservations` ADD CONSTRAINT `reservations_formule_id_fkey` FOREIGN KEY (`formule_id`) REFERENCES `formules`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reservations` ADD CONSTRAINT `reservations_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `appartenir` ADD CONSTRAINT `appartenir_salle_id_fkey` FOREIGN KEY (`salle_id`) REFERENCES `salles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `appartenir` ADD CONSTRAINT `appartenir_jourFerme_id_fkey` FOREIGN KEY (`jourFerme_id`) REFERENCES `joursFermes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `etre` ADD CONSTRAINT `etre_salle_id_fkey` FOREIGN KEY (`salle_id`) REFERENCES `salles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `etre` ADD CONSTRAINT `etre_formule_id_fkey` FOREIGN KEY (`formule_id`) REFERENCES `formules`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `appartenir` RENAME INDEX `jourFerme_id` TO `appartenir_jourFerme_id_idx`;

-- RenameIndex
ALTER TABLE `etre` RENAME INDEX `formule_id` TO `etre_formule_id_idx`;

-- RenameIndex
ALTER TABLE `reservations` RENAME INDEX `formule_id` TO `reservations_formule_id_idx`;

-- RenameIndex
ALTER TABLE `reservations` RENAME INDEX `user_id` TO `reservations_user_id_idx`;

-- RenameIndex
ALTER TABLE `salles` RENAME INDEX `lieu_id` TO `salles_lieu_id_idx`;

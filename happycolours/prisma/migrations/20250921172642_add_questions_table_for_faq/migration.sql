/*
  Warnings:

  - You are about to drop the `ReservationSalle` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `title` on table `formules` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `formules` required. This step will fail if there are existing NULL values in that column.
  - Made the column `image` on table `formules` required. This step will fail if there are existing NULL values in that column.
  - Made the column `color` on table `formules` required. This step will fail if there are existing NULL values in that column.
  - Made the column `icon` on table `formules` required. This step will fail if there are existing NULL values in that column.
  - Made the column `nom` on table `lieux` required. This step will fail if there are existing NULL values in that column.
  - Made the column `adresse` on table `lieux` required. This step will fail if there are existing NULL values in that column.
  - Made the column `NPA` on table `lieux` required. This step will fail if there are existing NULL values in that column.
  - Made the column `localite` on table `lieux` required. This step will fail if there are existing NULL values in that column.
  - Made the column `latitude` on table `lieux` required. This step will fail if there are existing NULL values in that column.
  - Made the column `longitude` on table `lieux` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `dateReservationWeb` to the `reservations` table without a default value. This is not possible if the table is not empty.
  - Made the column `date_` on table `reservations` required. This step will fail if there are existing NULL values in that column.
  - Made the column `debut` on table `reservations` required. This step will fail if there are existing NULL values in that column.
  - Made the column `nbrPerson` on table `reservations` required. This step will fail if there are existing NULL values in that column.
  - Made the column `nom` on table `salles` required. This step will fail if there are existing NULL values in that column.
  - Made the column `capacite` on table `salles` required. This step will fail if there are existing NULL values in that column.
  - Made the column `prix` on table `tranche_prix` required. This step will fail if there are existing NULL values in that column.
  - Made the column `minPersonnes` on table `tranche_prix` required. This step will fail if there are existing NULL values in that column.
  - Made the column `maxPersonnes` on table `tranche_prix` required. This step will fail if there are existing NULL values in that column.
  - Made the column `mail` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `salt` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `ReservationSalle` DROP FOREIGN KEY `ReservationSalle_reservation_id_fkey`;

-- DropForeignKey
ALTER TABLE `ReservationSalle` DROP FOREIGN KEY `ReservationSalle_salle_id_fkey`;

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

-- DropForeignKey
ALTER TABLE `tranche_prix` DROP FOREIGN KEY `tranche_prix_ibfk_1`;

-- AlterTable
ALTER TABLE `formules` MODIFY `title` VARCHAR(50) NOT NULL,
    MODIFY `description` VARCHAR(150) NOT NULL,
    MODIFY `image` VARCHAR(100) NOT NULL,
    MODIFY `color` VARCHAR(50) NOT NULL,
    MODIFY `icon` VARCHAR(50) NOT NULL;

-- AlterTable
ALTER TABLE `lieux` MODIFY `nom` VARCHAR(50) NOT NULL,
    MODIFY `adresse` VARCHAR(50) NOT NULL,
    MODIFY `NPA` INTEGER NOT NULL,
    MODIFY `localite` VARCHAR(50) NOT NULL,
    MODIFY `latitude` DECIMAL(12, 6) NOT NULL,
    MODIFY `longitude` DECIMAL(12, 6) NOT NULL;

-- AlterTable
ALTER TABLE `reservations` ADD COLUMN `dateReservationWeb` DATE NOT NULL,
    MODIFY `date_` DATE NOT NULL,
    MODIFY `debut` TIME NOT NULL,
    MODIFY `nbrPerson` TINYINT NOT NULL;

-- AlterTable
ALTER TABLE `salles` MODIFY `nom` VARCHAR(50) NOT NULL,
    MODIFY `capacite` TINYINT NOT NULL;

-- AlterTable
ALTER TABLE `tranche_prix` MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `prix` DECIMAL(10, 2) NOT NULL,
    MODIFY `minPersonnes` TINYINT NOT NULL,
    MODIFY `maxPersonnes` TINYINT NOT NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `mail` VARCHAR(320) NOT NULL,
    MODIFY `password` VARCHAR(100) NOT NULL,
    MODIFY `salt` VARCHAR(50) NOT NULL;

-- DropTable
DROP TABLE `ReservationSalle`;

-- CreateTable
CREATE TABLE `questions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `question` VARCHAR(1023) NOT NULL,
    `reponse` VARCHAR(2047) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `salles` ADD CONSTRAINT `salles_lieu_id_fkey` FOREIGN KEY (`lieu_id`) REFERENCES `lieux`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tranche_prix` ADD CONSTRAINT `tranche_prix_formule_id_fkey` FOREIGN KEY (`formule_id`) REFERENCES `formules`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

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

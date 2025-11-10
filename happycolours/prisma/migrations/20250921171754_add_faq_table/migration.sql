-- DropForeignKey
ALTER TABLE `appartenir` DROP FOREIGN KEY `appartenir_jourFerme_id_fkey`;

-- DropForeignKey
ALTER TABLE `appartenir` DROP FOREIGN KEY `appartenir_salle_id_fkey`;

-- DropForeignKey
ALTER TABLE `etre` DROP FOREIGN KEY `etre_formule_id_fkey`;

-- DropForeignKey
ALTER TABLE `etre` DROP FOREIGN KEY `etre_salle_id_fkey`;

-- DropForeignKey
ALTER TABLE `reservations` DROP FOREIGN KEY `reservations_formule_id_fkey`;

-- DropForeignKey
ALTER TABLE `reservations` DROP FOREIGN KEY `reservations_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `salles` DROP FOREIGN KEY `salles_lieu_id_fkey`;

-- DropForeignKey
ALTER TABLE `tranche_prix` DROP FOREIGN KEY `tranche_prix_formule_id_fkey`;

-- AddForeignKey
ALTER TABLE `salles` ADD CONSTRAINT `salles_ibfk_1` FOREIGN KEY (`lieu_id`) REFERENCES `lieux`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tranche_prix` ADD CONSTRAINT `tranche_prix_ibfk_1` FOREIGN KEY (`formule_id`) REFERENCES `formules`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reservations` ADD CONSTRAINT `reservations_ibfk_1` FOREIGN KEY (`formule_id`) REFERENCES `formules`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reservations` ADD CONSTRAINT `reservations_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `appartenir` ADD CONSTRAINT `appartenir_ibfk_2` FOREIGN KEY (`jourFerme_id`) REFERENCES `joursFermes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `appartenir` ADD CONSTRAINT `appartenir_ibfk_1` FOREIGN KEY (`salle_id`) REFERENCES `salles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `etre` ADD CONSTRAINT `etre_ibfk_2` FOREIGN KEY (`formule_id`) REFERENCES `formules`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `etre` ADD CONSTRAINT `etre_ibfk_1` FOREIGN KEY (`salle_id`) REFERENCES `salles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

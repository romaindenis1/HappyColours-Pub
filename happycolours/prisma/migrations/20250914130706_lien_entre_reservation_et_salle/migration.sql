-- AlterTable
ALTER TABLE `reservations` ADD COLUMN `salle_id` INTEGER NULL;

-- CreateIndex
CREATE INDEX `reservations_salle_id_idx` ON `reservations`(`salle_id`);

-- AddForeignKey
ALTER TABLE `reservations` ADD CONSTRAINT `reservations_salle_id_fkey` FOREIGN KEY (`salle_id`) REFERENCES `salles`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

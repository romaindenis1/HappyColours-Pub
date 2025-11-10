/*
  Warnings:

  - You are about to drop the column `duree` on the `reservations` table. All the data in the column will be lost.
  - You are about to drop the column `id_1` on the `tranche_prix` table. All the data in the column will be lost.
  - Added the required column `duree` to the `formules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `formule_id` to the `tranche_prix` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `tranche_prix` DROP FOREIGN KEY `tranche_prix_id_1_fkey`;

-- DropIndex
DROP INDEX `tranche_prix_id_1_idx` ON `tranche_prix`;

-- AlterTable
ALTER TABLE `formules` ADD COLUMN `duree` SMALLINT NOT NULL;

-- AlterTable
ALTER TABLE `reservations` DROP COLUMN `duree`;

-- AlterTable
ALTER TABLE `tranche_prix` DROP COLUMN `id_1`,
    ADD COLUMN `formule_id` INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX `tranche_prix_formule_id_idx` ON `tranche_prix`(`formule_id`);

-- AddForeignKey
ALTER TABLE `tranche_prix` ADD CONSTRAINT `tranche_prix_formule_id_fkey` FOREIGN KEY (`formule_id`) REFERENCES `formules`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

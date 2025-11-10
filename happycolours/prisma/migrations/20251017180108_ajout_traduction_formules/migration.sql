/*
  Warnings:

  - You are about to drop the column `description` on the `formules` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `formules` table. All the data in the column will be lost.
  - Added the required column `descriptionDE` to the `formules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descriptionEN` to the `formules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descriptionFR` to the `formules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titleDE` to the `formules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titleEN` to the `formules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titleFR` to the `formules` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `formules` DROP COLUMN `description`,
    DROP COLUMN `title`,
    ADD COLUMN `descriptionDE` VARCHAR(150) NOT NULL,
    ADD COLUMN `descriptionEN` VARCHAR(150) NOT NULL,
    ADD COLUMN `descriptionFR` VARCHAR(150) NOT NULL,
    ADD COLUMN `titleDE` VARCHAR(50) NOT NULL,
    ADD COLUMN `titleEN` VARCHAR(50) NOT NULL,
    ADD COLUMN `titleFR` VARCHAR(50) NOT NULL;

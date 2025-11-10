-- CreateTable
CREATE TABLE `appartenir` (
    `salle_id` INTEGER UNSIGNED NOT NULL,
    `jourFerme_id` INTEGER UNSIGNED NOT NULL,

    INDEX `jourFerme_id`(`jourFerme_id`),
    PRIMARY KEY (`salle_id`, `jourFerme_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `joursFermes` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `date_` DATE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `lieux` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(50) NOT NULL,
    `adresse` VARCHAR(100) NOT NULL,
    `NPA` SMALLINT NOT NULL,
    `localite` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reservations` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `date_` DATE NOT NULL,
    `debut` TIME(0) NOT NULL,
    `duree` SMALLINT NOT NULL,
    `formule_id` INTEGER UNSIGNED NOT NULL,
    `user_id` INTEGER UNSIGNED NOT NULL,

    INDEX `user_id`(`user_id`),
    INDEX `formule_id`(`formule_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `salles` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(50) NOT NULL,
    `capacite` TINYINT NOT NULL,
    `lieu_id` INTEGER UNSIGNED NOT NULL,

    INDEX `lieu_id`(`lieu_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `mail` VARCHAR(320) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `salt` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `etre` (
    `salle_id` INTEGER UNSIGNED NOT NULL,
    `formule_id` INTEGER UNSIGNED NOT NULL,

    INDEX `formule_id`(`formule_id`),
    PRIMARY KEY (`salle_id`, `formule_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `formules` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(50) NOT NULL,
    `description` VARCHAR(150) NOT NULL,
    `image` VARCHAR(255) NULL,
    `color` VARCHAR(50) NULL,
    `icon` VARCHAR(50) NULL,
    `prix` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `appartenir` ADD CONSTRAINT `appartenir_ibfk_1` FOREIGN KEY (`salle_id`) REFERENCES `salles`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `appartenir` ADD CONSTRAINT `appartenir_ibfk_2` FOREIGN KEY (`jourFerme_id`) REFERENCES `joursFermes`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `reservations` ADD CONSTRAINT `reservations_ibfk_1` FOREIGN KEY (`formule_id`) REFERENCES `formules`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `reservations` ADD CONSTRAINT `reservations_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `salles` ADD CONSTRAINT `salles_ibfk_1` FOREIGN KEY (`lieu_id`) REFERENCES `lieux`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `etre` ADD CONSTRAINT `etre_ibfk_1` FOREIGN KEY (`salle_id`) REFERENCES `salles`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `etre` ADD CONSTRAINT `etre_ibfk_2` FOREIGN KEY (`formule_id`) REFERENCES `formules`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

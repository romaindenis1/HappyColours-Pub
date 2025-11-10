-- CreateTable
CREATE TABLE `mails` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date_envoi` DATE NOT NULL,
    `type_mail` VARCHAR(191) NOT NULL,
    `user_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `mails` ADD CONSTRAINT `mails_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

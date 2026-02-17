-- CreateTable
CREATE TABLE `Wpis` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tytul` VARCHAR(191) NOT NULL,
    `tresc` VARCHAR(191) NOT NULL,
    `utworzono` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `kategoriaId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Kategoria` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nazwa` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `Kategoria_nazwa_key`(`nazwa`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Komentarz` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `autor` VARCHAR(191) NOT NULL,
    `tresc` VARCHAR(191) NOT NULL,
    `data` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `wpisId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Wpis` ADD CONSTRAINT `Wpis_kategoriaId_fkey` FOREIGN KEY (`kategoriaId`) REFERENCES `Kategoria`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Komentarz` ADD CONSTRAINT `Komentarz_wpisId_fkey` FOREIGN KEY (`wpisId`) REFERENCES `Wpis`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

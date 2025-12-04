-- AlterTable
ALTER TABLE `cars` ADD COLUMN `fuelTypeId` INTEGER NULL;

-- CreateTable
CREATE TABLE `fueltypes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `cars` ADD CONSTRAINT `cars_fuelTypeId_fkey` FOREIGN KEY (`fuelTypeId`) REFERENCES `fueltypes`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

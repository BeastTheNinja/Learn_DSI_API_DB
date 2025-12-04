/*
  Warnings:

  - You are about to drop the `fuel_types` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `cars` DROP FOREIGN KEY `cars_fuelTypeId_fkey`;

-- DropIndex
DROP INDEX `cars_fuelTypeId_fkey` ON `cars`;

-- DropTable
DROP TABLE `fuel_types`;

-- CreateTable
CREATE TABLE `fueltypes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `cars` ADD CONSTRAINT `cars_fuelTypeId_fkey` FOREIGN KEY (`fuelTypeId`) REFERENCES `fueltypes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

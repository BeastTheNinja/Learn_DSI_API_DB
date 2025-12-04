/*
  Warnings:

  - You are about to drop the column `fuelType` on the `cars` table. All the data in the column will be lost.
  - Added the required column `fuelTypeId` to the `cars` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cars` DROP COLUMN `fuelType`,
    ADD COLUMN `fuelTypeId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `fuel_types` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `cars` ADD CONSTRAINT `cars_fuelTypeId_fkey` FOREIGN KEY (`fuelTypeId`) REFERENCES `fuel_types`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

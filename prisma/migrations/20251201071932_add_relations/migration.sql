/*
  Warnings:

  - You are about to drop the column `logoURL` on the `brands` table. All the data in the column will be lost.
  - You are about to drop the column `brandID` on the `cars` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `cars` table. All the data in the column will be lost.
  - You are about to drop the column `fueltype` on the `cars` table. All the data in the column will be lost.
  - You are about to alter the column `price` on the `cars` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Double`.
  - Added the required column `logo` to the `brands` table without a default value. This is not possible if the table is not empty.
  - Added the required column `brandId` to the `cars` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryId` to the `cars` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fuelType` to the `cars` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `cars` DROP FOREIGN KEY `cars_brandID_fkey`;

-- DropIndex
DROP INDEX `cars_brandID_fkey` ON `cars`;

-- AlterTable
ALTER TABLE `brands` DROP COLUMN `logoURL`,
    ADD COLUMN `logo` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `cars` DROP COLUMN `brandID`,
    DROP COLUMN `category`,
    DROP COLUMN `fueltype`,
    ADD COLUMN `brandId` INTEGER NOT NULL,
    ADD COLUMN `categoryId` INTEGER NOT NULL,
    ADD COLUMN `fuelType` VARCHAR(191) NOT NULL,
    MODIFY `price` DOUBLE NOT NULL;

-- AddForeignKey
ALTER TABLE `cars` ADD CONSTRAINT `cars_brandId_fkey` FOREIGN KEY (`brandId`) REFERENCES `brands`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cars` ADD CONSTRAINT `cars_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

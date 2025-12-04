/*
  Warnings:

  - You are about to drop the column `fuelTypeId` on the `cars` table. All the data in the column will be lost.
  - You are about to drop the `fueltypes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `cars` DROP FOREIGN KEY `cars_fuelTypeId_fkey`;

-- DropIndex
DROP INDEX `cars_fuelTypeId_fkey` ON `cars`;

-- AlterTable
ALTER TABLE `cars` DROP COLUMN `fuelTypeId`;

-- DropTable
DROP TABLE `fueltypes`;

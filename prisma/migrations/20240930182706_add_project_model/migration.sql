-- AlterTable
ALTER TABLE `Issue` ADD COLUMN `projectId` INTEGER NULL;

-- CreateTable
CREATE TABLE `Project` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProjectMember` (
    `projectId` INTEGER NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `admin` BOOLEAN NOT NULL DEFAULT false,

    INDEX `ProjectMember_userId_idx`(`userId`),
    PRIMARY KEY (`projectId`, `userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `Issue_projectId_idx` ON `Issue`(`projectId`);

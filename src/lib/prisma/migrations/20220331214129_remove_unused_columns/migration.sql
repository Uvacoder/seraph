/*
  Warnings:

  - You are about to drop the column `authorId` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `language` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `sha` on the `File` table. All the data in the column will be lost.
  - Added the required column `extension` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_authorId_fkey";

-- AlterTable
ALTER TABLE "File" DROP COLUMN "authorId",
DROP COLUMN "language",
DROP COLUMN "sha",
ADD COLUMN     "extension" TEXT NOT NULL;

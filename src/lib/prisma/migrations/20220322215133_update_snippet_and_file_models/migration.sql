/*
  Warnings:

  - You are about to drop the column `title` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Snippet` table. All the data in the column will be lost.
  - You are about to drop the column `favicon` on the `Snippet` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Snippet` table. All the data in the column will be lost.
  - You are about to drop the column `siteName` on the `Snippet` table. All the data in the column will be lost.
  - Added the required column `fileName` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `language` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `visibility` to the `Snippet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "File" DROP COLUMN "title",
ADD COLUMN     "fileName" TEXT NOT NULL,
ADD COLUMN     "language" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Snippet" DROP COLUMN "description",
DROP COLUMN "favicon",
DROP COLUMN "image",
DROP COLUMN "siteName",
ADD COLUMN     "visibility" TEXT NOT NULL;

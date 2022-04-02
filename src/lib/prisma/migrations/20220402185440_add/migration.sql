-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_snippetId_fkey";

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_snippetId_fkey" FOREIGN KEY ("snippetId") REFERENCES "Snippet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

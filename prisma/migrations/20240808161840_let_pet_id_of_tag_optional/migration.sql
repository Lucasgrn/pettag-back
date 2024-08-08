-- DropForeignKey
ALTER TABLE "tags" DROP CONSTRAINT "tags_petId_fkey";

-- AlterTable
ALTER TABLE "tags" ALTER COLUMN "petId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "tags" ADD CONSTRAINT "tags_petId_fkey" FOREIGN KEY ("petId") REFERENCES "pets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

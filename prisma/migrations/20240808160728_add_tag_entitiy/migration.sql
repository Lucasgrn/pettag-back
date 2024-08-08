/*
  Warnings:

  - You are about to drop the column `token` on the `pets` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('active', 'inactive');

-- DropIndex
DROP INDEX "pets_token_key";

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "token";

-- CreateTable
CREATE TABLE "tags" (
    "id" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'inactive',
    "petId" TEXT NOT NULL,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tags_petId_key" ON "tags"("petId");

-- AddForeignKey
ALTER TABLE "tags" ADD CONSTRAINT "tags_petId_fkey" FOREIGN KEY ("petId") REFERENCES "pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

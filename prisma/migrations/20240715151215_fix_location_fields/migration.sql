/*
  Warnings:

  - You are about to drop the column `Number` on the `locations` table. All the data in the column will be lost.
  - Added the required column `number` to the `locations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "locations" DROP COLUMN "Number",
ADD COLUMN     "number" TEXT NOT NULL;

/*
  Warnings:

  - Added the required column `reference` to the `userLocations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "userLocations" ADD COLUMN     "reference" TEXT NOT NULL;

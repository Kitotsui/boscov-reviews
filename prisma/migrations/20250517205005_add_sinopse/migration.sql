/*
  Warnings:

  - Added the required column `sinopse` to the `Filme` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Filme" ADD COLUMN "sinopse" TEXT NOT NULL DEFAULT 'Sinopse não disponível';

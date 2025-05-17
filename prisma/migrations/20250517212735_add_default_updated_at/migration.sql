/*
  Warnings:

  - Made the column `comentario` on table `Avaliacao` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Avaliacao" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "comentario" SET NOT NULL;

-- AlterTable
ALTER TABLE "Filme" ALTER COLUMN "sinopse" DROP DEFAULT;

-- CreateIndex
CREATE INDEX "Avaliacao_filmeId_idx" ON "Avaliacao"("filmeId");

-- CreateIndex
CREATE INDEX "Avaliacao_usuarioId_idx" ON "Avaliacao"("usuarioId");

/*
  Warnings:

  - You are about to drop the column `createdAt` on the `tickets` table. All the data in the column will be lost.
  - You are about to drop the column `priority` on the `tickets` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Prioridade" AS ENUM ('BAIXA', 'MEDIA', 'ALTA');

-- AlterTable
ALTER TABLE "tickets" DROP COLUMN "createdAt",
DROP COLUMN "priority",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "justificativa" TEXT,
ADD COLUMN     "prioridade" "Prioridade" NOT NULL DEFAULT 'BAIXA',
ADD COLUMN     "updated_at" TIMESTAMP(3);

-- DropEnum
DROP TYPE "Priority";

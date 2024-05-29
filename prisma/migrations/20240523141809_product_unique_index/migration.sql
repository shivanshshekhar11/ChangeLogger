/*
  Warnings:

  - A unique constraint covering the columns `[Id,userId]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Product_Id_userId_key" ON "Product"("Id", "userId");

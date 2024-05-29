-- CreateEnum
CREATE TYPE "UPDATE_STATUS" AS ENUM ('IN_PROGRESS', 'SHIPPED', 'DEPRECATED');

-- CreateTable
CREATE TABLE "User" (
    "Id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "username" VARCHAR(40) NOT NULL,
    "password" VARCHAR(80) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Product" (
    "Id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR(40) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Update" (
    "Id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "status" "UPDATE_STATUS" NOT NULL,
    "version" VARCHAR(10),
    "media" TEXT,
    "productId" TEXT NOT NULL,

    CONSTRAINT "Update_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "UpdatePoint" (
    "Id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "updateId" TEXT NOT NULL,

    CONSTRAINT "UpdatePoint_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Update" ADD CONSTRAINT "Update_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UpdatePoint" ADD CONSTRAINT "UpdatePoint_updateId_fkey" FOREIGN KEY ("updateId") REFERENCES "Update"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

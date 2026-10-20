-- CreateEnum
CREATE TYPE "Sex" AS ENUM ('FEMALE', 'MALE', 'OTHER');

-- CreateEnum
CREATE TYPE "MealType" AS ENUM ('BREAKFAST', 'LUNCH', 'DINNER', 'SNACK', 'OTHER');

-- CreateEnum
CREATE TYPE "MealLocation" AS ENUM ('HOME', 'RESTAURANT', 'OTHER');

-- CreateEnum
CREATE TYPE "MealCategory" AS ENUM ('PROTEIN', 'CARBOHYDRATE', 'VEGETABLE', 'FRUIT', 'OTHER');

-- CreateEnum
CREATE TYPE "ExerciseIntensity" AS ENUM ('LIGHT', 'MODERATE', 'HIGH');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "heightCm" DECIMAL(65,30) NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "sex" "Sex" NOT NULL,
    "targetWeightKg" DECIMAL(65,30) NOT NULL,
    "exerciseGoalDaysPerWeek" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WeightEntry" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "weightKg" DECIMAL(65,30) NOT NULL,
    "recordedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WeightEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Meal" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "MealType" NOT NULL,
    "location" "MealLocation" NOT NULL,
    "restaurantName" TEXT,
    "description" TEXT,
    "photoUrl" TEXT,
    "estimatedCalories" INTEGER,
    "recordedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Meal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MealComponent" (
    "id" TEXT NOT NULL,
    "mealId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "estimatedCalories" INTEGER,
    "category" "MealCategory",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MealComponent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExerciseEntry" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "activityName" TEXT NOT NULL,
    "durationMinutes" INTEGER NOT NULL,
    "intensity" "ExerciseIntensity" NOT NULL,
    "estimatedCalories" INTEGER,
    "notes" TEXT,
    "recordedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExerciseEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomActivity" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CustomActivity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlantType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "imageKey" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlantType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GardenPlant" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "plantTypeId" TEXT NOT NULL,
    "plantedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GardenPlant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- CreateIndex
CREATE INDEX "WeightEntry_userId_recordedAt_idx" ON "WeightEntry"("userId", "recordedAt");

-- CreateIndex
CREATE INDEX "Meal_userId_recordedAt_idx" ON "Meal"("userId", "recordedAt");

-- CreateIndex
CREATE INDEX "MealComponent_mealId_idx" ON "MealComponent"("mealId");

-- CreateIndex
CREATE INDEX "ExerciseEntry_userId_recordedAt_idx" ON "ExerciseEntry"("userId", "recordedAt");

-- CreateIndex
CREATE UNIQUE INDEX "CustomActivity_userId_name_key" ON "CustomActivity"("userId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "PlantType_name_key" ON "PlantType"("name");

-- CreateIndex
CREATE INDEX "GardenPlant_userId_plantedAt_idx" ON "GardenPlant"("userId", "plantedAt");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WeightEntry" ADD CONSTRAINT "WeightEntry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meal" ADD CONSTRAINT "Meal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MealComponent" ADD CONSTRAINT "MealComponent_mealId_fkey" FOREIGN KEY ("mealId") REFERENCES "Meal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseEntry" ADD CONSTRAINT "ExerciseEntry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomActivity" ADD CONSTRAINT "CustomActivity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GardenPlant" ADD CONSTRAINT "GardenPlant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GardenPlant" ADD CONSTRAINT "GardenPlant_plantTypeId_fkey" FOREIGN KEY ("plantTypeId") REFERENCES "PlantType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "Google" (
    "id" TEXT NOT NULL,
    "googleId" TEXT NOT NULL,
    "localUserId" TEXT NOT NULL,

    CONSTRAINT "Google_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Github" (
    "id" TEXT NOT NULL,
    "githubId" TEXT NOT NULL,
    "localUserId" TEXT NOT NULL,

    CONSTRAINT "Github_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "secondName" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "avatar" TEXT,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserTheme" (
    "id" TEXT NOT NULL,
    "theme" TEXT NOT NULL,
    "device" TEXT,
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "UserTheme_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserLang" (
    "id" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "UserLang_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reviews" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "avarageRating" DOUBLE PRECISION NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "authorId" TEXT NOT NULL,
    "authorRate" INTEGER NOT NULL,

    CONSTRAINT "Reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "reviewsId" TEXT NOT NULL,
    "category" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tags" (
    "id" TEXT NOT NULL,
    "tag" TEXT NOT NULL,
    "postId" TEXT NOT NULL,

    CONSTRAINT "Tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comments" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "reviewId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notifications" (
    "id" TEXT NOT NULL,
    "commentId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReviewRating" (
    "id" TEXT NOT NULL,
    "rate" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "reviewId" TEXT NOT NULL,

    CONSTRAINT "ReviewRating_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Google_googleId_key" ON "Google"("googleId");

-- CreateIndex
CREATE UNIQUE INDEX "Google_localUserId_key" ON "Google"("localUserId");

-- CreateIndex
CREATE UNIQUE INDEX "Github_githubId_key" ON "Github"("githubId");

-- CreateIndex
CREATE UNIQUE INDEX "Github_localUserId_key" ON "Github"("localUserId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_login_key" ON "User"("login");

-- CreateIndex
CREATE UNIQUE INDEX "UserTheme_ownerId_key" ON "UserTheme"("ownerId");

-- CreateIndex
CREATE UNIQUE INDEX "UserLang_ownerId_key" ON "UserLang"("ownerId");

-- CreateIndex
CREATE UNIQUE INDEX "Reviews_title_authorId_key" ON "Reviews"("title", "authorId");

-- CreateIndex
CREATE UNIQUE INDEX "Notifications_commentId_key" ON "Notifications"("commentId");

-- CreateIndex
CREATE UNIQUE INDEX "ReviewRating_reviewId_key" ON "ReviewRating"("reviewId");

-- AddForeignKey
ALTER TABLE "Google" ADD CONSTRAINT "Google_localUserId_fkey" FOREIGN KEY ("localUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Github" ADD CONSTRAINT "Github_localUserId_fkey" FOREIGN KEY ("localUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTheme" ADD CONSTRAINT "UserTheme_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserLang" ADD CONSTRAINT "UserLang_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_reviewsId_fkey" FOREIGN KEY ("reviewsId") REFERENCES "Reviews"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tags" ADD CONSTRAINT "Tags_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Reviews"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "Reviews"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notifications" ADD CONSTRAINT "Notifications_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notifications" ADD CONSTRAINT "Notifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReviewRating" ADD CONSTRAINT "ReviewRating_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "Reviews"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

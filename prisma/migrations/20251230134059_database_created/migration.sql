-- CreateEnum
CREATE TYPE "PostStatus" AS ENUM ('published', 'edited', 'banned');

-- CreateEnum
CREATE TYPE "CommentStatus" AS ENUM ('published', 'edited', 'banned');

-- CreateTable
CREATE TABLE "posts" (
    "id" SERIAL NOT NULL,
    "post_title" TEXT NOT NULL,
    "post_description" TEXT NOT NULL,
    "post_tags" TEXT[],
    "post_thumbnail" TEXT,
    "published_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "view_count" INTEGER NOT NULL DEFAULT 0,
    "post_status" "PostStatus" NOT NULL DEFAULT 'published',
    "author_id" INTEGER NOT NULL,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comments" (
    "comment_id" SERIAL NOT NULL,
    "post_id" INTEGER NOT NULL,
    "author_id" INTEGER NOT NULL,
    "comment_description" TEXT NOT NULL,
    "comment_title" TEXT NOT NULL,
    "comment_tags" TEXT[],
    "published_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "comment_status" "CommentStatus" NOT NULL DEFAULT 'published',
    "comment_parent" INTEGER,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("comment_id")
);

-- CreateIndex
CREATE INDEX "posts_id_idx" ON "posts"("id");

-- CreateIndex
CREATE INDEX "comments_post_id_idx" ON "comments"("post_id");

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_comment_parent_fkey" FOREIGN KEY ("comment_parent") REFERENCES "comments"("comment_id") ON DELETE SET NULL ON UPDATE CASCADE;

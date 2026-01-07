/*
  Warnings:

  - You are about to drop the column `comment_tags` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `comment_title` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `published_at` on the `comments` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "comments" DROP COLUMN "comment_tags",
DROP COLUMN "comment_title",
DROP COLUMN "published_at",
ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP;

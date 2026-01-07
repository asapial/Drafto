-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_comment_parent_fkey";

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_post_id_fkey";

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_comment_parent_fkey" FOREIGN KEY ("comment_parent") REFERENCES "comments"("comment_id") ON DELETE CASCADE ON UPDATE CASCADE;

import { Post } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createPostQuery= async (data:Omit<Post,'id' | 'created_at' | 'author_id'|'post_status' | 'view_count' | 'published_at'>,author_id:number)=>{
    const result= await prisma.post.create({
        data:{
            ...data,
            author_id:author_id,
            published_at: new Date()
        }
    })
return result;
}



export const postServices={
    createPostQuery
}
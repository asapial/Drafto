import { Post } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createPostQuery= async (data:Omit<Post,'id' | 'created_at' >)=>{
    const result= await prisma.post.create({
        data
    })
return result;
}



export const postServices={
    createPostQuery
}
import { number } from "better-auth/*"
import { prisma } from "../../lib/prisma"

const postCommentQuery = async (
    payload: {
        post_id: number,
        author_id: string,
        comment_description: string,
        comment_parent?: number
    }
) => {

    console.log("Payload : ", payload)

    const result = await prisma.comment.create({
        data: {
            post_id: payload.post_id,
            author_id: payload.author_id,
            comment_description: payload.comment_description,
            comment_parent: payload.comment_parent ?? null
        }
    })

    return result;
}


const getCommentByIdQuery = async (param: string) => {

    const result = await prisma.comment.findUnique({
        where: {
            comment_id: Number(param)
        },
        include: {
            posts: {
                select: {
                    id: true,
                    post_title: true,
                    post_description: true
                }
            }
        }
    }
    )

    return result;
}


const getCommentByAuthorIdQuery = async (param: string) => {
    const result = await prisma.comment.findMany({
        where: {
            author_id: param
        },
        include:{
            posts:{
                select:{
                    post_title:true,
                    post_description:true
                }
            }
        }
    })

    return result;
}



export const commentService = {
    postCommentQuery,
    getCommentByIdQuery,
    getCommentByAuthorIdQuery
}


import { error } from "node:console"
import { CommentStatus } from "../../generated/prisma/enums"
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
        include: {
            posts: {
                select: {
                    post_title: true,
                    post_description: true
                }
            }
        }
    })

    return result;
}


const deleteCommentByIdQuery = async (params: string, author_id: string) => {



    const isPresent = await prisma.comment.findFirst({
        where: {
            comment_id: Number(params),
            author_id: author_id
        }
    });
    console.log(params, author_id)

    if (!isPresent) {
        throw new Error("Comment is not present")
    }

    const result = await prisma.comment.delete({
        where: {
            comment_id: Number(params)
        }
    })

    return result;
}


const updateCommentById = async (
  commentId: number,
  author_id: string,
  comment_description: string
) => {

  const comment = await prisma.comment.findFirst({
    where: {
      comment_id: commentId,
      author_id: author_id,
    },
  });

  if (!comment) {
    throw new Error("Comment not found or you are not authorized");
  }

  const updated = await prisma.comment.update({
    where: {
      comment_id: commentId,
    },
    data: {
      comment_description,
      updated_at: new Date(),
    },
  });

  return updated;
};

const moderateCommentById = async (
  commentId: number,
  comment_status: CommentStatus
) => {

  const comment = await prisma.comment.findFirst({
    where: {
      comment_id: commentId
    },
  });


  if (!comment) {
    throw new Error("Comment not found");
  }

  if(comment.comment_status===comment_status){
    throw new Error("Your provided status is same as current status");
  }

  const updated = await prisma.comment.update({
    where: {
      comment_id: commentId,
    },
    data: {
      comment_status,
      updated_at: new Date(),
    },
  });

  return updated;
};

export const commentService = {
    postCommentQuery,
    getCommentByIdQuery,
    getCommentByAuthorIdQuery,
    deleteCommentByIdQuery,
    updateCommentById,
    moderateCommentById
}


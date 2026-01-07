import { skip } from "node:test";
import { Post } from "../../../generated/prisma/client";
import { PostWhereInput } from "../../generated/prisma/models";
import { prisma } from "../../lib/prisma";

const createPostQuery = async (data: Omit<Post, 'id' | 'created_at' | 'author_id' | 'post_status' | 'view_count' | 'published_at'>, author_id: string) => {
    const result = await prisma.post.create({
        data: {
            ...data,
            author_id: author_id,
            published_at: new Date()
        }
    })
    return result;
}

const getAllPostQuery = async (payload: {
    search: string | undefined,
    tags: string[] | [],
    is_featured: boolean | undefined,
    page: number,
    skip: number,
    limit: number,
    sortBy: string,
    sortOrder: string
}) => {

    const searchingCondition: PostWhereInput[] = []
    if (payload.search) {
        searchingCondition.push({
            OR: [
                {
                    post_title: {
                        contains: payload.search as string,
                        mode: "insensitive"
                    }
                },
                {
                    post_description: {
                        contains: payload.search as string,
                        mode: "insensitive"
                    }
                },
                {
                    post_tags: {
                        has: payload.search as string,
                    }
                }
            ]
        })
    }

    if (payload.tags.length > 0) {
        searchingCondition.push({
            post_tags: {
                hasEvery: payload.tags
            }
        })
    }

    if (payload.is_featured != undefined) {
        searchingCondition.push({
            is_featured: payload.is_featured,
        })
    }


    const result = await prisma.post.findMany({
        skip: payload.skip,
        take: payload.limit,
        orderBy: {
            [payload.sortBy]: payload.sortOrder
        },
        where: {
            AND: searchingCondition
        },
        include: {
            comments: {
                where: {
                    comment_parent: null
                },
                orderBy: {
                    created_at: "desc"
                },
                include: {
                    replies: {
                        orderBy: {
                            created_at: "asc"
                        }
                    }
                }
            },
            _count: {
                select: { comments: true }
            }
        }
    });
    return {
        page: payload.page,
        skip: payload.skip,
        limit: payload.limit,
        data: result
    };

}

const getPostQueryById = async (params: string) => {

    const result = await prisma.$transaction(async (tx) => {
        const updateViewCount = await tx.post.update({
            where: {
                id: Number(params)
            },
            data: {
                view_count: {
                    increment: 1
                }
            }
        })

        const postData = await tx.post.findUniqueOrThrow({
            where: {
                id: Number(params)
            }
        })
        return postData;
    })

    return result;




}

export const postServices = {
    createPostQuery,
    getAllPostQuery,
    getPostQueryById
}
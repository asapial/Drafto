import { Request, Response } from "express";
import { commentService } from "./comment.service";
import { success } from "better-auth/*";

const postComment = async (req: Request, res: Response) => {


    try {
        console.log(req.body);
        req.body.author_id=req.user?.id
        const result =  await commentService.postCommentQuery(req.body);
        console.log(req.body.author_id);

        return res.status(201).json({
            success:true,
            message: "Comment created successfully",
            data: result
        })

    } catch (error) {
        console.error("Post creation failed:", error);

        return res.status(500).json({
            success: false,
            message: "Something went wrong while creating your comment. Please try again.",
        });
    }

}

const getCommentById = async (req: Request, res: Response) => {


    try {


        const params=req.params.id;

        const result =  await commentService.getCommentByIdQuery(params as string);


        return res.status(201).json({
            success:true,
            message: "Comment created successfully",
            data: result
        })

    } catch (error) {
        console.error("Post creation failed:", error);

        return res.status(500).json({
            success: false,
            message: "Something went wrong while creating your comment. Please try again.",
        });
    }

}

const getCommentByAuthorId = async (req: Request, res: Response) => {


    try {


        const params=req.params.id;

        const result =  await commentService.getCommentByAuthorIdQuery(params as string);


        return res.status(201).json({
            success:true,
            message: "Comment created successfully",
            data: result
        })

    } catch (error) {
        console.error("Post creation failed:", error);

        return res.status(500).json({
            success: false,
            message: "Something went wrong while creating your comment. Please try again.",
        });
    }

}

export const commentController = {
    postComment,
    getCommentById,
    getCommentByAuthorId
}
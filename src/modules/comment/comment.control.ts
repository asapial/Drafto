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


const deleteCommentById = async (req: Request, res: Response) => {


    try {

        const params=req.params.id;
        const author_id=req.user?.id

        const result =  await commentService.deleteCommentByIdQuery(params as string,author_id);


        return res.status(201).json({
            success:true,
            message: "Comment deleted successfully",
            data: result
        })

    } catch (error) {
        console.error("Post creation failed:", error);

        return res.status(500).json({
            success: false,
            message: "Something went wrong while deleting your comment. Please try again.",
        });
    }

}

const updateCommentById = async (req: Request, res: Response) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const commentId = Number(req.params.id);
    const { comment_description } = req.body;

    if (!comment_description || !comment_description.trim()) {
      return res.status(400).json({
        success: false,
        message: "Comment description is required",
      });
    }

    const result = await commentService.updateCommentById(
      commentId,
      req.user.id,
      comment_description
    );

    return res.status(200).json({
      success: true,
      message: "Comment updated successfully",
      data: result,
    });

  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const commentController = {
    postComment,
    getCommentById,
    getCommentByAuthorId,
    deleteCommentById,
    updateCommentById
}
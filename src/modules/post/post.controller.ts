import express from "express"
import { postServices } from "./post.service"


const postTheUser = async (req: express.Request, res: express.Response) => {
  try {
    const {
      post_title,
      post_description,
      post_tags,
      post_thumbnail,
      published_at,
      post_status,
      author_id,
    } = req.body;

    /* ---------- Validation ---------- */

    if (!post_title) {
      return res.status(400).json({
        success: false,
        message: "Please enter a title for your post.",
      });
    }

    if (typeof post_title !== "string" || post_title.length < 5) {
      return res.status(400).json({
        success: false,
        message: "The post title should be at least 5 characters long.",
      });
    }

    if (!post_description) {
      return res.status(400).json({
        success: false,
        message: "Please add some content to your post.",
      });
    }

    if (typeof post_description !== "string") {
      return res.status(400).json({
        success: false,
        message: "Post content must be written in text format.",
      });
    }

    // if (!author_id) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Author information is missing. Please log in again.",
    //   });
    // }

    if (post_tags && !Array.isArray(post_tags)) {
      return res.status(400).json({
        success: false,
        message: "Tags should be provided as a list.",
      });
    }

    // if (
    //   post_thumbnail &&
    //   (typeof post_thumbnail !== "string" ||
    //     !/^https?:\/\/.+/.test(post_thumbnail))
    // ) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Please provide a valid image URL for the thumbnail.",
    //   });
    // }

    // if (
    //   post_status &&
    //   !["draft", "published"].includes(post_status)
    // ) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Post status must be either draft or published.",
    //   });
    // }

    // if (published_at && isNaN(Date.parse(published_at))) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Please provide a valid publish date.",
    //   });
    // }

    /* ---------- Create post ---------- */

    const result = await postServices.createPostQuery(req.body,req.user.id);

    return res.status(201).json({
      success: true,
      message: "Your post has been published successfully.",
      data: result,
    });

  } catch (error) {
    console.error("Post creation failed:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while creating your post. Please try again.",
    });
  }
};









export const postController = {
    postTheUser
}